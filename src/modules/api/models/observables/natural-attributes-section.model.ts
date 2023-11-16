import { ObservableEntityType } from './oet.model';
import { AggregateSectionName, BaseAggregateSection } from './aggregate-section.model';
import { AttributeObservableEntity, AttributeValueType } from './attributes.model';
import { FactOfAttribute } from './fact-of-attribute.model';

export type NaturalAttributesSection<OET = ObservableEntityType> = BaseAggregateSection<
    AggregateSectionName.NaturalAttributes,
    FactOfNaturalAttribute<OET>[]
>;

// prettier-ignore
export type FactOfNaturalAttribute<OET = ObservableEntityType> =
    OET extends ObservableEntityType.IPAddress ? FactOfNaturalAttributeIpAddress :
    OET extends ObservableEntityType.DomainName ? FactOfNaturalAttributeDomainName :
    OET extends ObservableEntityType.EmailAddress ? FactOfNaturalAttributeEmailAddress :
    OET extends ObservableEntityType.Identity ? FactOfNaturalAttributeIdentity:
    OET extends ObservableEntityType.File ? FactOfNaturalAttributeFile :
        | FactOfNaturalAttributeIpAddress
        | FactOfNaturalAttributeEmailAddress
        | FactOfNaturalAttributeIdentity
        | FactOfNaturalAttributeFile;

export type FactOfNaturalAttributeIpAddress =
    | FactOfIpAddressRegionalInternetRegistry
    | FactOfIpAddressASN
    | FactOfIpAddressStatuses;

export type FactOfNaturalAttributeDomainName = FactOfDomainNameIsDelegated | FactOfDomainNameStatuses;

export type FactOfNaturalAttributeFile = FactOfFileSize | FactOfFileNames | FactOfFileMalwareNames | FactOfPlatforms;

export type FactOfNaturalAttributeIdentity = FactOfIdentityClass | FactOfIdentityNames | FactOfIdentitySectors;

export type FactOfNaturalAttributeEmailAddress = FactOfEmailAddressDisplayNames;

export type FactOfIpAddressRegionalInternetRegistry = FactOfAttribute<
    AttributeObservableEntity.RegionalInternetRegistry,
    AttributeValueType<AttributeObservableEntity.RegionalInternetRegistry>
>;

export type FactOfIpAddressASN = FactOfAttribute<
    AttributeObservableEntity.ASN,
    AttributeValueType<AttributeObservableEntity.ASN>
>;

export type FactOfIpAddressStatuses = FactOfAttribute<
    AttributeObservableEntity.Statuses,
    AttributeValueType<AttributeObservableEntity.Statuses>
>;

export type FactOfDomainNameIsDelegated = FactOfAttribute<
    AttributeObservableEntity.IsDelegated,
    AttributeValueType<AttributeObservableEntity.IsDelegated>
>;

export type FactOfDomainNameStatuses = FactOfAttribute<
    AttributeObservableEntity.Statuses,
    AttributeValueType<AttributeObservableEntity.Statuses>
>;

export type FactOfFileNames = FactOfAttribute<
    AttributeObservableEntity.Names,
    AttributeValueType<AttributeObservableEntity.Names>
>;

export type FactOfFileSize = FactOfAttribute<
    AttributeObservableEntity.Size,
    AttributeValueType<AttributeObservableEntity.Size>
>;

export type FactOfFileMalwareNames = FactOfAttribute<
    AttributeObservableEntity.MalwareNames,
    AttributeValueType<AttributeObservableEntity.MalwareNames>
>;

export type FactOfIdentityNames = FactOfAttribute<
    AttributeObservableEntity.Names,
    AttributeValueType<AttributeObservableEntity.Names>
>;

export type FactOfIdentityClass = FactOfAttribute<
    AttributeObservableEntity.Class,
    AttributeValueType<AttributeObservableEntity.Class>
>;

export type FactOfIdentitySectors = FactOfAttribute<
    AttributeObservableEntity.Sectors,
    AttributeValueType<AttributeObservableEntity.Sectors>
>;

export type FactOfEmailAddressDisplayNames = FactOfAttribute<
    AttributeObservableEntity.DisplayNames,
    AttributeValueType<AttributeObservableEntity.DisplayNames>
>;

export type FactOfPlatforms = FactOfAttribute<
    AttributeObservableEntity.Platforms,
    AttributeValueType<AttributeObservableEntity.Platforms>
>;
