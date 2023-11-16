import { ApiCallResult, ApiGetParams, ApiService } from '../../shared/services';

import { AggregatesRequestParams, Aggregate, RelationStatistic } from '../models';
import { Result } from '@badrap/result';

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
        return this.api.get('observable/entities', params as unknown as ApiGetParams, { signal });
    }

    getStatistic(entityId: string, signal: AbortSignal) {
        const url = `observable/entities/${entityId}/link-type-statistic`;

        return this.api.get<RelationStatistic[]>(url, null, { signal });
    }
}
