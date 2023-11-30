import { ObservableEntityType } from '../../../api/models';
import { EntityFullInfoModel } from '../models';

export interface EntityBrief {
    uuid: string;
    type: ObservableEntityType;
    key: string;
}

export class EntityBriefMapper {
    static fromModel(entity: EntityFullInfoModel): EntityBrief {
        const priorityKey = entity.getPriorityKey();

        return { uuid: entity.getId(), type: entity.getType(), key: priorityKey.value };
    }

    static fromModels(entities: EntityFullInfoModel[]): EntityBrief[] {
        return entities.map((entity) => EntityBriefMapper.fromModel(entity));
    }
}
