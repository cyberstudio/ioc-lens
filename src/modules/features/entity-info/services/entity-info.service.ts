import { Result } from '@badrap/result';
import isNil from 'lodash/isNil';

import {
    ObservableEntityType,
    ObservableEntityKeyType,
    AggregatesRequestParams,
    AggregateSectionName
} from '../../../api/models';
import { EntitiesApiService } from '../../../api/services';
import { ApiCallResult, ApiErrorCode } from '../../../shared/services';
import { isFailureAuthState } from '../../../shared/stores';
import { AuthService } from '../../auth/services/auth.service';
import { EntityBrief, EntityBriefMapper, EntityMetadataMapper } from '../mappers';
import { EntityFullInfoModel } from '../models';
import { EntityMetadata } from '../models/entity-metadata.model';

export class EntityInfoService {
    constructor(
        private entitiesApiService: EntitiesApiService,
        private authService: AuthService
    ) {}

    async getEntities(
        params: { type: ObservableEntityType; keyType: ObservableEntityKeyType; key: string }[],
        signal: AbortSignal
    ) {
        const getEntitiesResults = await Promise.all(params.map((p) => this.getEntityByKey(p, signal)));
        const getEntitiesErrorResult = getEntitiesResults.find((r) => r.isErr);

        if (!isNil(getEntitiesErrorResult) && getEntitiesErrorResult.isErr) {
            return Result.err(getEntitiesErrorResult.error);
        }

        const entities = getEntitiesResults
            .map((r) => (r.isOk ? r.value : null))
            .filter((data) => !isNil(data) && !isNil(data.metadata));

        return Result.ok(entities) as Result<{ brief: EntityBrief; metadata: EntityMetadata }[]>;
    }

    private async getEntityByKey(
        params: { type: ObservableEntityType; keyType: ObservableEntityKeyType; key: string },
        signal: AbortSignal
    ) {
        const result = await this.getEntityData(params, signal);

        if (result.isOk) {
            if (isNil(result.value)) {
                return Result.ok(null);
            }

            const model = EntityFullInfoModel.createFromRawData(result.value.entity, result.value.statistic);

            return Result.ok({
                brief: EntityBriefMapper.fromModel(model),
                metadata: EntityMetadataMapper.fromModel(model)
            });
        }

        return Result.err(result.error);
    }

    private async getEntityData(
        params: { type: ObservableEntityType; keyType: ObservableEntityKeyType; key: string },
        signal: AbortSignal
    ) {
        const getEntityResult = await this.callAndAuthOnUnauthenticated(
            () => this.entitiesApiService.getAggregate(this.createAggregateRequestParams(params), signal),
            signal
        );

        if (getEntityResult.isErr) {
            return Result.err(getEntityResult.error);
        }

        const entity = getEntityResult.value[0];

        if (isNil(entity)) {
            return Result.ok(null);
        }

        const getRelationsStatisticsResult = await this.callAndAuthOnUnauthenticated(
            () => this.entitiesApiService.getRelationsStatistic(entity.uuid, signal),
            signal
        );

        if (getRelationsStatisticsResult.isErr) {
            return Result.err(getRelationsStatisticsResult.error);
        }

        const statistic = getRelationsStatisticsResult.value;

        return Result.ok({ entity, statistic });
    }

    private createAggregateRequestParams(params: Partial<AggregatesRequestParams>): AggregatesRequestParams {
        return {
            ...params,
            section: [
                AggregateSectionName.AssociatedAttributes,
                AggregateSectionName.NaturalAttributes,
                AggregateSectionName.Labels
            ]
        };
    }

    private async callAndAuthOnUnauthenticated<T>(
        request: () => ApiCallResult<T>,
        signal: AbortSignal
    ): ApiCallResult<T> {
        try {
            const result = await request();

            if (result.isOk) {
                return result;
            }

            if (result.error.name === ApiErrorCode.Unauthenticated) {
                await this.authService.auth(signal);

                const authState = await this.authService.getState();

                if (isFailureAuthState(authState)) {
                    const error = new Error(authState.error);
                    error.name = authState.error;

                    return Result.err(error);
                }
            }

            return request();
        } catch {
            const error = new Error(ApiErrorCode.Unknown);
            error.name = ApiErrorCode.Unknown;

            return Result.err(error);
        }
    }
}
