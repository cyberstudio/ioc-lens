import { Result } from '@badrap/result';
import isNil from 'lodash/isNil';
import castArray from 'lodash/castArray';

import { AuthStore, SettingsStore, isSuccessAuthState } from '../stores';
import { AbortRequestError } from '../utils';
import isEmpty from 'lodash/isEmpty';
import { PaginationParams } from '../../api/models';

export interface IFullListResponse<T> {
    currentCursor: string;
    fullList: T[];
}

export class ApiService {
    constructor(
        private settingsStore: SettingsStore,
        private authStore: AuthStore
    ) {}

    get<Response>(path: string, params: ApiGetParams | null, options: ApiRequestOptions): ApiCallResult<Response> {
        return this.sendRequest('get', path, params ? this.mapGetParamsToUrlSearchParams(params) : null, options);
    }

    getFullList<T, P extends PaginationParams>(
        url: string,
        params: P,
        signal: AbortSignal
    ): ApiCallResult<IFullListResponse<T>> {
        const requestOptions = params ? this.mapGetParamsToUrlSearchParams(params as unknown as ApiGetParams) : {};
        let data: T[] = [];
        let currentCursor = params?.cursor || '';
        let nextCursor: string | null;

        const walkThroughPages = async (): ApiCallResult<IFullListResponse<T>> =>
            this.get<Response>(
                url,
                {
                    ...requestOptions,
                    cursor: currentCursor as string
                },
                {
                    signal,
                    responseType: ResponseType.RAW
                }
            ).then(async (result) => {
                const response = result.unwrap();

                if (result.isOk) {
                    const newData: T[] = await response.json();

                    nextCursor = this.getNextCursor(response.headers);
                    data = [...data, ...newData];

                    if (isEmpty(nextCursor)) {
                        const fulList: IFullListResponse<T> = { currentCursor, fullList: data };

                        return new Promise((resolve) => resolve(Result.ok<IFullListResponse<T>, ApiError>(fulList)));
                    } else {
                        currentCursor = nextCursor as string;

                        return walkThroughPages();
                    }
                } else {
                    return Result.err(result.error);
                }
            });

        return walkThroughPages();
    }

    private sendRequest<Response>(
        method: string,
        path: string,
        params: BodyInit | null,
        options: ApiRequestOptions
    ): ApiCallResult<Response> {
        return this.getRequestConfig()
            .then((requestConfig) => {
                const hasToken = !isNil(requestConfig.token);

                if (isNil(requestConfig.host) || requestConfig.host.length === 0) {
                    return Result.err(new ApiError(ApiErrorCode.UnknownHost));
                }

                if (options.authenticatedRequest && !hasToken) {
                    return Result.err(new ApiError(ApiErrorCode.Unauthenticated));
                }

                const headers = new Headers({
                    Accept: 'application/vnd.ptsecurity.app-v2',
                    'Content-Type': 'application/json'
                });

                if (hasToken) {
                    headers.append('Authorization', `Bearer ${requestConfig.token}`);
                }

                const queryParams = params && method === 'get' ? '?' + params.toString() : '';

                const host = requestConfig.host.endsWith('/') ? requestConfig.host : `${requestConfig.host}/`;

                const url = `${host}${path}${queryParams}`;

                return fetch(url, {
                    method,
                    mode: 'cors',
                    headers,
                    body: method !== 'get' ? JSON.stringify(params) : null,
                    signal: options.signal
                })
                    .then((response) => {
                        if (response.status === 401) {
                            throw new ApiError(ApiErrorCode.Unauthenticated);
                        }

                        if (response.status === 403) {
                            throw new ApiError(ApiErrorCode.Forbidden);
                        }

                        if (!response.ok) {
                            throw new ApiError(ApiErrorCode.Unknown);
                        }

                        return options.responseType === ResponseType.RAW ? response : response.json();
                    })
                    .then((response: Response) => Result.ok<Response, ApiError>(response));
            })
            .catch((error: Error) => {
                if (options.signal.aborted) {
                    return Result.err(new AbortRequestError());
                }

                if (error instanceof ApiError) {
                    return Result.err(error as ApiError<ApiErrorCodes>);
                }

                return Result.err(new ApiError(ApiErrorCode.Unknown));
            });
    }

    private mapGetParamsToUrlSearchParams(params: ApiGetParams): URLSearchParams {
        const urlSearchParams = new URLSearchParams();

        Object.keys(params).forEach((key) => {
            castArray(params[key]).forEach((val) => {
                urlSearchParams.append(key, val?.toString());
            });
        });

        return urlSearchParams;
    }

    private getRequestConfig(): Promise<{ host: string | null; token: string | null }> {
        return Promise.all([this.settingsStore.getDataSource(), this.authStore.getState()]).then(
            ([settings, authState]) => {
                if (isSuccessAuthState(authState)) {
                    return { host: settings.host, token: authState.token };
                }

                return { host: settings.host, token: null };
            }
        );
    }

    private getNextCursor(headers: Headers): string | null {
        return headers.get('X-Cursor') || null;
    }
}

export const ApiErrorCode = Object.freeze({
    Unknown: 'Unknown',
    UnknownHost: 'UnknownHost',
    Forbidden: 'Forbidden',
    Unauthenticated: 'Unauthenticated'
});

type ApiErrorCodes = keyof typeof ApiErrorCode;

export class ApiError<ErrorName extends ApiErrorCodes = ApiErrorCodes> extends Error {
    name: ErrorName;

    constructor(name: ErrorName) {
        super('');

        this.name = name;
        this.stack = undefined;
    }
}

export type ApiCallResult<Response> = Promise<Result<Response, ApiError | AbortRequestError>>;

enum ResponseType {
    JSON = 'JSON',
    RAW = 'RAW'
}

interface ApiRequestOptions {
    signal: AbortSignal;
    authenticatedRequest?: boolean;
    responseType?: ResponseType;
}

export type ApiGetParams = Record<string, string | number | boolean | (string | number | boolean)[]>;
