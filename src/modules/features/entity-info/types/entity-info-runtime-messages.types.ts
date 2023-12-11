import { ObservableEntityType, ObservableEntityKeyType } from '../../../api/models';
import { RuntimeRequestMessage, RuntimeResponseMessage } from '../../../shared/types';
import { EntityBrief } from '../mappers';
import { EntityMetadata } from '../models/entity-metadata.model';
import { ResultDTO } from '../../../shared/utils';

export type GetEntitiesInfoRequestMessage = RuntimeRequestMessage<
    'GetEntities',
    { params: { type: ObservableEntityType; keyType: ObservableEntityKeyType; key: string }[] }
>;

export type GetEntitiesInfoResponseMessage = RuntimeResponseMessage<
    ResultDTO<{ brief: EntityBrief; metadata: EntityMetadata }[]>
>;
