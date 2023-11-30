import isEmpty from 'lodash/isEmpty';
import {
    Aggregate,
    AggregateSectionName,
    AttributeObservableEntity,
    FactOfAssociatedAttribute,
    FactOfNaturalAttribute,
    FileKey,
    FileKeyType,
    IdentityKey,
    IdentityKeyType,
    LabelsSectionData,
    ObservableEntityKey,
    ObservableEntityType,
    Section
} from '../../../api/models';
const FILE_KEY_TYPES_BY_PRIORITY: FileKeyType[] = ['SHA256Hash', 'SHA1Hash', 'MD5Hash'];
const IDENTITY_KEY_TYPES_BY_PRIORITY: IdentityKeyType[] = ['NICHandle', 'IANAID'];

export class AggregateModel<EntityType extends ObservableEntityType = ObservableEntityType> {
    get id(): string {
        return this.aggregate.uuid;
    }

    get type(): Aggregate<EntityType>['type'] {
        return this.aggregate.type;
    }

    get keys(): Aggregate<EntityType>['keys'] {
        return this.aggregate.keys;
    }

    get raw(): Aggregate<EntityType> {
        return this.aggregate;
    }

    constructor(private aggregate: Aggregate<EntityType>) {}

    private static isMatchedWithEntityType<ET extends ObservableEntityType>(
        model: AggregateModel,
        entityType: ET
    ): model is AggregateModel<ET> {
        return model.aggregate.type === entityType;
    }

    getFactOfAttribute<AttributeName extends AttributeObservableEntity>(
        attributeName: AttributeName
    ): FactOfNaturalAttribute | FactOfAssociatedAttribute | undefined {
        return this.findFactOfNaturalAttribute(attributeName) || this.findFactOfAssociatedAttribute(attributeName);
    }

    getSectionFacts(
        section: AggregateSectionName
    ): FactOfNaturalAttribute[] | FactOfAssociatedAttribute[] | LabelsSectionData {
        const attributes = this.findSection(section);

        return attributes?.data || [];
    }

    findFactOfNaturalAttribute<AttributeName extends AttributeObservableEntity>(
        attributeName: AttributeName
    ): FactOfNaturalAttribute<EntityType> | undefined {
        const facts = this.getSectionFacts(AggregateSectionName.NaturalAttributes) as FactOfNaturalAttribute[];

        const isMatchedFactOfAttribute = (item: FactOfNaturalAttribute): item is FactOfNaturalAttribute<EntityType> =>
            item.attributeName === attributeName;

        return facts.find(isMatchedFactOfAttribute);
    }

    findFactOfAssociatedAttribute<AttributeName extends AttributeObservableEntity>(
        attributeName: AttributeName
    ): FactOfAssociatedAttribute<EntityType> | undefined {
        const facts = this.getSectionFacts(AggregateSectionName.AssociatedAttributes) as FactOfAssociatedAttribute[];

        const isMatchedFactOfAttribute = (
            item: FactOfAssociatedAttribute
        ): item is FactOfAssociatedAttribute<EntityType> => item.attributeName === attributeName;

        return facts.find(isMatchedFactOfAttribute);
    }

    findSection<SectionName extends AggregateSectionName, S extends Section<SectionName>>(
        sectionName: SectionName
    ): S | undefined {
        const sections = this.aggregate.sections as S[];

        if (isEmpty(sections)) {
            return undefined;
        }

        const findPredicate = (s: S): s is S => s.name === sectionName;

        return sections.find(findPredicate);
    }

    getPriorityKey(): ObservableEntityKey {
        if (this.is(ObservableEntityType.File)) {
            const keys = this.keys;
            const priorityKeys: FileKey[] = [];

            FILE_KEY_TYPES_BY_PRIORITY.find((keyType: FileKeyType) => {
                const key = keys.find((key: FileKey) => key.type === keyType);

                if (!priorityKeys.length && key) {
                    priorityKeys.push(key);
                }

                return key;
            });

            return priorityKeys[0];
        } else if (this.is(ObservableEntityType.Identity)) {
            const keys = this.keys;
            const priorityKeys: IdentityKey[] = [];

            IDENTITY_KEY_TYPES_BY_PRIORITY.find((keyType: IdentityKeyType) => {
                const key = keys.find((key: IdentityKey) => key.type === keyType);

                if (!priorityKeys.length && key) {
                    priorityKeys.push(key);
                }

                return key;
            });

            return priorityKeys[0];
        } else {
            return this.aggregate.keys[0];
        }
    }

    is<ET extends ObservableEntityType>(entityType: ET): this is AggregateModel<ET> {
        return AggregateModel.isMatchedWithEntityType(this, entityType);
    }
}

export type TAggregateModel =
    | AggregateModel<ObservableEntityType.File>
    | AggregateModel<ObservableEntityType.Identity>
    | AggregateModel<ObservableEntityType.IPAddress>
    | AggregateModel<ObservableEntityType.DomainName>
    | AggregateModel<ObservableEntityType.URL>
    | AggregateModel<ObservableEntityType.EmailAddress>
    | AggregateModel<ObservableEntityType.PhoneNumber>;
