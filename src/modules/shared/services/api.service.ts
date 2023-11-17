import { Result } from '@badrap/result';
import isNil from 'lodash/isNil';
import castArray from 'lodash/castArray';

import { AuthStore, SettingsStore, isSuccessAuthState } from '../stores';
import { AbortRequestError } from '../utils';

export class ApiService {
    constructor(
        private settingsStore: SettingsStore,
        private authStore: AuthStore
    ) {}

    get<Response>(path: string, params: ApiGetParams | null, options: ApiRequestOptions): ApiCallResult<Response> {
        return this.sendRequest('get', path, params ? this.mapGetParamsToUrlSearchParams(params) : null, options);
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

                if (isNil(requestConfig.host)) {
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

                const url = `${requestConfig.host}/${path}${queryParams}`;

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

                        return response.json();
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
                urlSearchParams.append(key, val.toString());
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

type ApiCallResult<Response> = Promise<Result<Response, ApiError | AbortRequestError>>;

interface ApiRequestOptions {
    authenticatedRequest?: boolean;
    signal: AbortSignal;
}

export type ApiGetParams = Record<string, string | number | boolean | (string | number | boolean)[]>;
