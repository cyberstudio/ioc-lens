import { AggregateSectionName, BaseAggregateSection } from './aggregate-section.model';
import { AttributeObservableEntity, AttributeValueType } from './attributes.model';
import { FactOfAttribute } from './fact-of-attribute.model';
import { ObservableEntityType } from './oet.model';

export type AssociatedAttributesSection<OET = ObservableEntityType> = BaseAggregateSection<
    AggregateSectionName.AssociatedAttributes,
    FactOfAssociatedAttribute<OET>[]
>;

// prettier-ignore
export type FactOfAssociatedAttribute<OET = ObservableEntityType> =
    OET extends ObservableEntityType.DomainName ? FactOfAssociatedAttributeDomainName :
    OET extends ObservableEntityType.IPAddress ? FactOfAssociatedAttributeIpAddress :
    OET extends ObservableEntityType.EmailAddress ? FactOfAssociatedAttributeEmailAddress :
    OET extends ObservableEntityType.URL ? FactOfAssociatedAttributeUrl :
    OET extends ObservableEntityType.PhoneNumber ? FactOfAssociatedAttributePhoneNumber :
    OET extends ObservableEntityType.File ? FactOfAssociatedAttributeFile :
        | FactOfAssociatedAttributeDomainName
        | FactOfAssociatedAttributeIpAddress
        | FactOfAssociatedAttributeEmailAddress
        | FactOfAssociatedAttributeUrl
        | FactOfAssociatedAttributePhoneNumber
        | FactOfAssociatedAttributeFile;

export type FactOfAssociatedAttributeDomainName =
    | FactOfExploitedVulnerabilities
    | FactOfTargetedSectors
    | FactOfRelatedThreatCategory
    | FactOfRelatedMalwareFamilies
    | FactOfNodeRole
    | FactOfIsTrusted
    | FactOfIsDGA
    | FactOfIsIoC
    | FactOfThreatActors
    | FactOfCampaigns
    | FactOfAffectedCountries
    | FactOfPotentialDamage;

export type FactOfAssociatedAttributeIpAddress =
    | FactOfExploitedVulnerabilities
    | FactOfTargetedSectors
    | FactOfRelatedThreatCategory
    | FactOfRelatedMalwareFamilies
    | FactOfNodeRole
    | FactOfIsTrusted
    | FactOfIsIoC
    | FactOfThreatActors
    | FactOfCampaigns
    | FactOfAffectedCountries
    | FactOfRegistrationCountry
    | FactOfPotentialDamage;

export type FactOfAssociatedAttributeEmailAddress =
    | FactOfExploitedVulnerabilities
    | FactOfTargetedSectors
    | FactOfRelatedThreatCategory
    | FactOfRelatedMalwareFamilies
    | FactOfIsTrusted
    | FactOfIsIoC
    | FactOfThreatActors
    | FactOfCampaigns
    | FactOfAffectedCountries;

export type FactOfAssociatedAttributeUrl =
    | FactOfExploitedVulnerabilities
    | FactOfTargetedSectors
    | FactOfRelatedThreatCategory
    | FactOfRelatedMalwareFamilies
    | FactOfIsTrusted
    | FactOfIsIoC
    | FactOfThreatActors
    | FactOfCampaigns
    | FactOfAffectedCountries
    | FactOfPotentialDamage;

export type FactOfAssociatedAttributeFile =
    | FactOfExploitedVulnerabilities
    | FactOfTargetedSectors
    | FactOfThreatCategory
    | FactOfMalwareClasses
    | FactOfMalwareFamilies
    | FactOfIsTrusted
    | FactOfIsIoC
    | FactOfThreatActors
    | FactOfCampaigns
    | FactOfAffectedCountries
    | FactOfPotentialDamage;

export type FactOfAssociatedAttributePhoneNumber = FactOfIsIoC;

export type FactOfNodeRole = FactOfAttribute<
    AttributeObservableEntity.NodeRoles,
    AttributeValueType<AttributeObservableEntity.NodeRoles>
>;

export type FactOfIsTrusted = FactOfAttribute<
    AttributeObservableEntity.IsTrusted,
    AttributeValueType<AttributeObservableEntity.IsTrusted>
>;

export type FactOfIsDGA = FactOfAttribute<
    AttributeObservableEntity.IsDGA,
    AttributeValueType<AttributeObservableEntity.IsDGA>
>;

export type FactOfIsIoC = FactOfAttribute<
    AttributeObservableEntity.IsIoC,
    AttributeValueType<AttributeObservableEntity.IsIoC>
>;

export type FactOfMalwareClasses = FactOfAttribute<
    AttributeObservableEntity.MalwareClasses,
    AttributeValueType<AttributeObservableEntity.MalwareClasses>
>;

export type FactOfMalwareFamilies = FactOfAttribute<
    AttributeObservableEntity.MalwareFamilies,
    AttributeValueType<AttributeObservableEntity.MalwareFamilies>
>;

export type FactOfRelatedMalwareFamilies = FactOfAttribute<
    AttributeObservableEntity.RelatedMalwareFamilies,
    AttributeValueType<AttributeObservableEntity.RelatedMalwareFamilies>
>;

export type FactOfThreatCategory = FactOfAttribute<
    AttributeObservableEntity.ThreatCategory,
    AttributeValueType<AttributeObservableEntity.ThreatCategory>
>;

export type FactOfRelatedThreatCategory = FactOfAttribute<
    AttributeObservableEntity.RelatedThreatCategory,
    AttributeValueType<AttributeObservableEntity.RelatedThreatCategory>
>;

export type FactOfThreatActors = FactOfAttribute<
    AttributeObservableEntity.ThreatActors,
    AttributeValueType<AttributeObservableEntity.ThreatActors>
>;

export type FactOfCampaigns = FactOfAttribute<
    AttributeObservableEntity.Campaigns,
    AttributeValueType<AttributeObservableEntity.Campaigns>
>;

export type FactOfAffectedCountries = FactOfAttribute<
    AttributeObservableEntity.AffectedCountries,
    AttributeValueType<AttributeObservableEntity.AffectedCountries>
>;

export type FactOfExploitedVulnerabilities = FactOfAttribute<
    AttributeObservableEntity.ExploitedVulnerabilities,
    AttributeValueType<AttributeObservableEntity.ExploitedVulnerabilities>
>;

export type FactOfTargetedSectors = FactOfAttribute<
    AttributeObservableEntity.TargetedSectors,
    AttributeValueType<AttributeObservableEntity.TargetedSectors>
>;

export type FactOfRegistrationCountry = FactOfAttribute<
    AttributeObservableEntity.RegistrationCountry,
    AttributeValueType<AttributeObservableEntity.RegistrationCountry>
>;

export type FactOfPotentialDamage = FactOfAttribute<
    AttributeObservableEntity.PotentialDamage,
    AttributeValueType<AttributeObservableEntity.PotentialDamage>
>;
