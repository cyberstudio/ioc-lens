import { ApiCallResult, ApiGetParams, ApiService } from '../../shared/services';

import { Aggregate, AggregatesRequestParams, ObservableEntityType, RelationStatistic } from '../models';
import { Result } from '@badrap/result';

const REGEX = /%(\d[a-f0-9])/gi;
const REPLACEMENTS: Record<string, string> = {
    '40': '@',
    '3A': ':',
    '24': '$',
    '2C': ',',
    '3D': '=',
    '3F': '?',
    '2F': '/'
};

export const encoding = (value: string): string => {
    return encodeURIComponent(value).replace(REGEX, (substring, index) => REPLACEMENTS[index] ?? substring);
};

export class EntitiesApiService {
    constructor(private api: ApiService) {}

    getAggregates(entitiesParams: AggregatesRequestParams[], signal: AbortSignal): ApiCallResult<Aggregate[]> {
        return Promise.all(entitiesParams.map((params) => this.getAggregate(params, signal))).then((data) => {
            const erroredResult = data.find((res) => res.isErr);

            if (erroredResult) {
                return erroredResult;
            }

            const aggregates: Aggregate[] = data.reduce((accumulator: Aggregate[], result) => {
                const aggregate: Aggregate[] = result.unwrap();

                return accumulator.concat(aggregate);
            }, []);

            return Result.ok(aggregates);
        });
    }

    getAggregate(params: AggregatesRequestParams, signal: AbortSignal): ApiCallResult<Aggregate[]> {
        if (params.type === ObservableEntityType.URL) {
            params = {
                ...params,
                ...(params.key ? { key: encoding(params.key) } : {})
            };
        }

        return this.api.get('observable/entities', params as unknown as ApiGetParams, { signal });
    }

    getRelationsStatistic(entityId: string, signal: AbortSignal) {
        const url = `observable/entities/${entityId}/link-type-statistic`;

        return this.api.get<RelationStatistic[]>(url, null, { signal });
    }
}
