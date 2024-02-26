import {
    AttributeObservableEntity,
    FactOfAssociatedAttribute,
    FactOfNaturalAttribute,
    FILE_KEY_TYPES,
    isKnownAttribute,
    isKnownAttributeValue,
    ObservableEntityType
} from '../../../api/models';
import { EntityFullInfoModel } from '../models';
import {
    DomainNameMetadata,
    EmailAddressMetadata,
    EntityAttributeValuesProps,
    EntityMetadata,
    FileMetadata,
    IpAddressMetadata,
    PhoneNumberMetadata,
    UrlMetadata
} from '../models/entity-metadata.model';
import { HashSumMapper, HashSumType } from './hash-sum.mapper';

export class EntityMetadataMapper {
    static fromModel(entity: EntityFullInfoModel): EntityMetadata | null {
        if (entity.is(ObservableEntityType.File)) {
            return EntityMetadataMapper.fromFileModel(entity);
        } else if ((entity as EntityFullInfoModel).is(ObservableEntityType.IPAddress)) {
            return EntityMetadataMapper.fromIpAddressModel(entity);
        } else if ((entity as EntityFullInfoModel).is(ObservableEntityType.DomainName)) {
            return EntityMetadataMapper.fromDomainNameModel(entity);
        } else if ((entity as EntityFullInfoModel).is(ObservableEntityType.URL)) {
            return EntityMetadataMapper.fromUrlModel(entity);
        } else if ((entity as EntityFullInfoModel).is(ObservableEntityType.EmailAddress)) {
            return EntityMetadataMapper.fromEmailAddressModel(entity);
        } else if ((entity as EntityFullInfoModel).is(ObservableEntityType.PhoneNumber)) {
            return EntityMetadataMapper.fromPhoneNumberModel(entity);
        } else {
            return null;
        }
    }

    static fromFileModel(entity: EntityFullInfoModel<ObservableEntityType.File>): FileMetadata {
        const verdictAttributes = [
            AttributeObservableEntity.ThreatCategory,
            AttributeObservableEntity.IsIoC,
            AttributeObservableEntity.IsTrusted
        ];

        const attributes = [
            AttributeObservableEntity.PotentialDamage,
            AttributeObservableEntity.MalwareClasses,
            AttributeObservableEntity.MalwareFamilies,
            AttributeObservableEntity.MalwareNames,
            AttributeObservableEntity.Campaigns,
            AttributeObservableEntity.ThreatActors,
            AttributeObservableEntity.AffectedCountries,
            AttributeObservableEntity.ExploitedVulnerabilities,
            AttributeObservableEntity.TargetedSectors,
            AttributeObservableEntity.Size,
            AttributeObservableEntity.Platforms,
            AttributeObservableEntity.Names
        ];

        const baseEntityMetadata = this.getEntityMetadata<ObservableEntityType.File>(
            entity,
            verdictAttributes,
            attributes
        );

        const hashSums = FILE_KEY_TYPES.map((type) => ({
            type: HashSumMapper.fromFileKeyType(type) as HashSumType,
            value: entity.getKeys().find((key) => key.type === type)?.value || null
        }));

        return {
            ...baseEntityMetadata,
            hashSums
        };
    }

    static fromIpAddressModel(entity: EntityFullInfoModel<ObservableEntityType.IPAddress>): IpAddressMetadata {
        const verdictAttributes = [
            AttributeObservableEntity.RelatedThreatCategory,
            AttributeObservableEntity.IsIoC,
            AttributeObservableEntity.IsTrusted
        ];

        const attributes = [
            AttributeObservableEntity.PotentialDamage,
            AttributeObservableEntity.ASN,
            AttributeObservableEntity.RegistrationCountry,
            AttributeObservableEntity.RegionalInternetRegistry,
            AttributeObservableEntity.Statuses,
            AttributeObservableEntity.NodeRoles,
            AttributeObservableEntity.RelatedMalwareFamilies,
            AttributeObservableEntity.Campaigns,
            AttributeObservableEntity.ThreatActors,
            AttributeObservableEntity.AffectedCountries,
            AttributeObservableEntity.ExploitedVulnerabilities,
            AttributeObservableEntity.TargetedSectors
        ];

        return this.getEntityMetadata<ObservableEntityType.IPAddress>(entity, verdictAttributes, attributes);
    }

    static fromDomainNameModel(entity: EntityFullInfoModel<ObservableEntityType.DomainName>): DomainNameMetadata {
        const verdictAttributes = [
            AttributeObservableEntity.RelatedThreatCategory,
            AttributeObservableEntity.IsIoC,
            AttributeObservableEntity.IsTrusted,
            AttributeObservableEntity.IsDGA,
            AttributeObservableEntity.IsDelegated
        ];

        const attributes = [
            AttributeObservableEntity.PotentialDamage,
            AttributeObservableEntity.Statuses,
            AttributeObservableEntity.NodeRoles,
            AttributeObservableEntity.RelatedMalwareFamilies,
            AttributeObservableEntity.Campaigns,
            AttributeObservableEntity.ThreatActors,
            AttributeObservableEntity.AffectedCountries,
            AttributeObservableEntity.ExploitedVulnerabilities,
            AttributeObservableEntity.TargetedSectors
        ];

        return this.getEntityMetadata<ObservableEntityType.DomainName>(entity, verdictAttributes, attributes);
    }

    static fromUrlModel(entity: EntityFullInfoModel<ObservableEntityType.URL>): UrlMetadata {
        const verdictAttributes = [
            AttributeObservableEntity.RelatedThreatCategory,
            AttributeObservableEntity.IsIoC,
            AttributeObservableEntity.IsTrusted
        ];

        const attributes = [
            AttributeObservableEntity.PotentialDamage,
            AttributeObservableEntity.RelatedMalwareFamilies,
            AttributeObservableEntity.Campaigns,
            AttributeObservableEntity.ThreatActors,
            AttributeObservableEntity.AffectedCountries,
            AttributeObservableEntity.ExploitedVulnerabilities,
            AttributeObservableEntity.TargetedSectors
        ];

        return this.getEntityMetadata<ObservableEntityType.URL>(entity, verdictAttributes, attributes);
    }

    static fromEmailAddressModel(entity: EntityFullInfoModel<ObservableEntityType.EmailAddress>): EmailAddressMetadata {
        const verdictAttributes = [
            AttributeObservableEntity.RelatedThreatCategory,
            AttributeObservableEntity.IsIoC,
            AttributeObservableEntity.IsTrusted
        ];

        const attributes = [
            AttributeObservableEntity.DisplayNames,
            AttributeObservableEntity.RelatedMalwareFamilies,
            AttributeObservableEntity.Campaigns,
            AttributeObservableEntity.ThreatActors,
            AttributeObservableEntity.AffectedCountries,
            AttributeObservableEntity.ExploitedVulnerabilities,
            AttributeObservableEntity.TargetedSectors
        ];

        return this.getEntityMetadata<ObservableEntityType.EmailAddress>(entity, verdictAttributes, attributes);
    }

    static fromPhoneNumberModel(entity: EntityFullInfoModel<ObservableEntityType.PhoneNumber>): PhoneNumberMetadata {
        const verdictAttributes = [AttributeObservableEntity.IsIoC];

        const attributes: AttributeObservableEntity[] = [];

        return this.getEntityMetadata<ObservableEntityType.PhoneNumber>(entity, verdictAttributes, attributes);
    }

    private static getEntityMetadata<EntityType extends ObservableEntityType = ObservableEntityType>(
        entity: EntityFullInfoModel,
        verdictAttributesOrder: AttributeObservableEntity[],
        attributesOrder: AttributeObservableEntity[]
    ) {
        const verdictAttributes = verdictAttributesOrder
            .map((attribute) => entity.getAttribute(attribute))
            .filter((attribute) => !!attribute)
            .map((attribute) =>
                this.getEntityAttributeValuesProps(attribute as FactOfNaturalAttribute | FactOfAssociatedAttribute)
            )
            .filter((attribute) => attribute.values.length > 0);

        const factsOfKnownAttributes = entity
            .getAllFactsOfAttribute()
            .filter(
                (fact) =>
                    verdictAttributesOrder.indexOf(fact.attributeName as AttributeObservableEntity) === -1 &&
                    isKnownAttributeValue(fact.attributeName, fact.values[0]?.value)
            );

        const attributes = factsOfKnownAttributes
            .sort((a, b) => {
                const aPosition = attributesOrder.indexOf(a.attributeName as AttributeObservableEntity);
                const bPosition = attributesOrder.indexOf(b.attributeName as AttributeObservableEntity);

                // If both elements are in the ordered array, sort based on their order
                if (aPosition !== -1 && bPosition !== -1) {
                    return aPosition - bPosition;
                }

                // If only one element is in the ordered array, it should come first
                if (aPosition !== -1) {
                    return -1;
                }

                if (bPosition !== -1) {
                    return 1;
                }

                return 0;
            })
            .map((attribute) => this.getEntityAttributeValuesProps(attribute));

        return {
            id: entity.getId(),
            type: entity.getType() as EntityType,
            priorityKey: entity.getPriorityKey().value,
            verdictAttributes,
            attributes,
            relatedEntitiesAmount: entity.getLinksAmount(),
            labels: entity.getLabels(),
            hasUnknownAttributes: attributes.some(({ isKnownAttribute }) => !isKnownAttribute)
        };
    }

    static getEntityAttributeValues(fact: FactOfAssociatedAttribute | FactOfNaturalAttribute) {
        return fact.attributeName === AttributeObservableEntity.ThreatCategory ||
            fact.attributeName === AttributeObservableEntity.RelatedThreatCategory
            ? this.getThreatCategoryValues(fact as FactOfAssociatedAttribute)
            : fact.values;
    }

    static getEntityAttributeValuesProps(
        fact: FactOfAssociatedAttribute | FactOfNaturalAttribute
    ): EntityAttributeValuesProps {
        const values = this.getEntityAttributeValues(fact);

        return {
            attributeName: fact.attributeName,
            isKnownAttribute: isKnownAttribute(fact.attributeName),
            values
        };
    }

    static getThreatCategoryValues(fact: FactOfAssociatedAttribute) {
        const values = fact?.values || [];
        const hasValues = values.length > 0;

        return hasValues ? values : [{ confidence: null, value: null }];
    }
}
