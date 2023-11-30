import { AggregateModel } from './aggregate.model';
import {
    Aggregate,
    AggregateSectionName,
    AttributeObservableEntity,
    FactOfAssociatedAttribute,
    FactOfNaturalAttribute,
    ObservableEntityKey,
    ObservableEntityType,
    RelationStatistic
} from '../../../api/models';

export class EntityFullInfoModel<EntityType extends ObservableEntityType = ObservableEntityType> {
    constructor(
        public aggregate: AggregateModel<EntityType>,
        public relationStatistic: RelationStatistic[] = []
    ) {}

    static createFromRawData<EntityType extends ObservableEntityType = ObservableEntityType>(
        aggregate: Aggregate<EntityType>,
        relationStatistic: RelationStatistic[] = []
    ): EntityFullInfoModel<EntityType> {
        return new EntityFullInfoModel(new AggregateModel<EntityType>(aggregate), relationStatistic);
    }

    private static isMatchedWithEntityType<ET extends ObservableEntityType>(
        model: EntityFullInfoModel,
        entityType: ET
    ): model is EntityFullInfoModel<ET> {
        return model.aggregate.type === entityType;
    }

    getId(): this['aggregate']['id'] {
        return this.aggregate.id;
    }

    getType(): this['aggregate']['type'] {
        return this.aggregate.type;
    }

    getKeys(): this['aggregate']['keys'] {
        return this.aggregate.keys;
    }

    getPriorityKey(): ObservableEntityKey {
        return this.aggregate.getPriorityKey();
    }

    getAttribute(attribute: AttributeObservableEntity): FactOfNaturalAttribute | FactOfAssociatedAttribute | undefined {
        return this.aggregate.getFactOfAttribute(attribute);
    }

    getName(): string | null {
        const mainKey = this.getPriorityKey();

        return mainKey.value;
    }

    getLabels(): string[] {
        const labelsSection = this.aggregate.findSection(AggregateSectionName.Labels);

        return labelsSection?.data?.labels || [];
    }

    getLinksAmount(): number {
        return this.relationStatistic.reduce((accumulator: number, relationStatistic: RelationStatistic) => {
            return accumulator + relationStatistic.links.total;
        }, 0);
    }

    getAllFactsOfAttribute(): (FactOfNaturalAttribute | FactOfAssociatedAttribute)[] {
        const naturalAttributeFacts: FactOfNaturalAttribute[] = this.aggregate.getSectionFacts(
            AggregateSectionName.NaturalAttributes
        ) as FactOfNaturalAttribute[];
        const associatedAttributeFacts: FactOfAssociatedAttribute[] = this.aggregate.getSectionFacts(
            AggregateSectionName.AssociatedAttributes
        ) as FactOfAssociatedAttribute[];

        return [...naturalAttributeFacts, ...associatedAttributeFacts];
    }

    is<ET extends ObservableEntityType>(entityType: ET): this is EntityFullInfoModel<ET> {
        return EntityFullInfoModel.isMatchedWithEntityType(this, entityType);
    }
}
