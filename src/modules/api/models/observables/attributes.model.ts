import { DictionaryItemBrief } from '../dictionaries';
import isNil from 'lodash/isNil';

export enum AttributeObservableEntity {
    Size = 'Size',
    Names = 'Names',
    DisplayNames = 'DisplayNames',
    Class = 'Class',
    Sectors = 'Sectors',
    NodeRoles = 'NodeRoles',
    IsDGA = 'IsDGA',
    IsIoC = 'IsIoC',
    IsTrusted = 'IsTrusted',
    IsDelegated = 'IsDelegated',
    RegionalInternetRegistry = 'RegionalInternetRegistry',
    ASN = 'ASN',
    Statuses = 'Statuses',
    MalwareClasses = 'MalwareClasses',
    MalwareFamilies = 'MalwareFamilies',
    RelatedMalwareFamilies = 'RelatedMalwareFamilies',
    ThreatCategory = 'ThreatCategory',
    RelatedThreatCategory = 'RelatedThreatCategory',
    MalwareNames = 'MalwareNames',
    ThreatActors = 'ThreatActors',
    Campaigns = 'Campaigns',
    AffectedCountries = 'AffectedCountries',
    ExploitedVulnerabilities = 'ExploitedVulnerabilities',
    TargetedSectors = 'TargetedSectors',
    RegistrationCountry = 'RegistrationCountry',
    PotentialDamage = 'PotentialDamage',
    Platforms = 'Platforms'
}

export const ATTRIBUTES = Object.values(AttributeObservableEntity);

/* eslint-disable prettier/prettier */
export type AttributeValueType<AttributeName = AttributeObservableEntity> =
    AttributeName extends AttributeObservableEntity.Size ? number :
    AttributeName extends AttributeObservableEntity.Names ? string :
    AttributeName extends AttributeObservableEntity.DisplayNames ? string :
    AttributeName extends AttributeObservableEntity.Class ? IdentityClass :
    AttributeName extends AttributeObservableEntity.Sectors ? DictionaryItemBrief :
    AttributeName extends AttributeObservableEntity.NodeRoles ? NodeRole :
    AttributeName extends AttributeObservableEntity.IsDGA ? boolean :
    AttributeName extends AttributeObservableEntity.IsIoC ? boolean :
    AttributeName extends AttributeObservableEntity.IsTrusted ? boolean :
    AttributeName extends AttributeObservableEntity.IsDelegated ? boolean :
    AttributeName extends AttributeObservableEntity.RegionalInternetRegistry ? RegionalInternetRegistry :
    AttributeName extends AttributeObservableEntity.ASN ? number :
    AttributeName extends AttributeObservableEntity.Statuses ? DictionaryItemBrief :
    AttributeName extends AttributeObservableEntity.MalwareClasses ? DictionaryItemBrief :
    AttributeName extends AttributeObservableEntity.MalwareFamilies ? DictionaryItemBrief :
    AttributeName extends AttributeObservableEntity.RelatedMalwareFamilies ? DictionaryItemBrief :
    AttributeName extends AttributeObservableEntity.ThreatActors ? DictionaryItemBrief :
    AttributeName extends AttributeObservableEntity.Campaigns ? DictionaryItemBrief :
    AttributeName extends AttributeObservableEntity.AffectedCountries ? DictionaryItemBrief :
    AttributeName extends AttributeObservableEntity.ExploitedVulnerabilities ? DictionaryItemBrief :
    AttributeName extends AttributeObservableEntity.TargetedSectors ? DictionaryItemBrief :
    AttributeName extends AttributeObservableEntity.ThreatCategory ? ThreatCategory | null :
    AttributeName extends AttributeObservableEntity.RelatedThreatCategory ? RelatedThreatCategory | null :
    AttributeName extends AttributeObservableEntity.MalwareNames ? string :
    AttributeName extends AttributeObservableEntity.RegistrationCountry ? DictionaryItemBrief :
    AttributeName extends AttributeObservableEntity.PotentialDamage ? PotentialDamage :
    AttributeName extends AttributeObservableEntity.Platforms ? DictionaryItemBrief :
        | boolean
        | number
        | string
        | NodeRole
        | RegionalInternetRegistry
        | ThreatCategory
        | RelatedThreatCategory
        | DictionaryItemBrief
        | PotentialDamage
        | null;
/* eslint-enable prettier/prettier */

type KeysMatching<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

export type ObservableEntityAttributeByFormat<Type> = KeysMatching<
    { [K in AttributeObservableEntity]: AttributeValueType<K> },
    Type
>;

export enum NodeRole {
    CnC = 'CnC',
    TorNode = 'TorNode',
    TorExitNode = 'TorExitNode',
    Proxy = 'Proxy',
    NameServer = 'NameServer',
    MailExchanger = 'MailExchanger',
    Phishing = 'Phishing',
    DynDNS = 'DynDNS',
    Cloud = 'Cloud',
    VPN = 'VPN',
    STUN = 'STUN',
    Sinkhole = 'Sinkhole',
    PayloadDelivery = 'PayloadDelivery',
    ExfiltrationStore = 'ExfiltrationStore',
    CDN = 'CDN',
    BitTorrentTracker = 'BitTorrentTracker'
}

export const NODE_ROLES = Object.values(NodeRole);

export enum RegionalInternetRegistry {
    RIPE = 'RIPE',
    APNIC = 'APNIC',
    ARIN = 'ARIN',
    AFRINIC = 'AFRINIC',
    LACNIC = 'LACNIC'
}

export const REGIONAL_INTERNET_REGISTRIES = Object.values(RegionalInternetRegistry);

export enum IdentityClass {
    Individual = 'Individual',
    Group = 'Group',
    Organization = 'Organization',
    Class = 'Class'
}

export const IDENTITY_CLASSES = Object.values(IdentityClass);

export enum ThreatCategory {
    Malware = 'Malware',
    Adware = 'Adware',
    Riskware = 'Riskware',
    Clean = 'Clean'
}

export const THREAT_CATEGORIES = Object.values(ThreatCategory);

export enum RelatedThreatCategory {
    Malware = 'Malware',
    Adware = 'Adware',
    Riskware = 'Riskware'
}

export const RELATED_THREAT_CATEGORIES = Object.values(RelatedThreatCategory);

export enum PotentialDamage {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low'
}

export const POTENTIAL_DAMAGES = Object.values(PotentialDamage);

export const isKnownAttribute = (attributeName: AttributeObservableEntity | string) => {
    return ATTRIBUTES.includes(attributeName as AttributeObservableEntity);
};

export const isKnownAttributeValue = (attributeName: AttributeObservableEntity | string, value: unknown) => {
    return (
        isNumberAttributeValue(value) ||
        isBooleanAttributeValue(value) ||
        isStringAttributeValue(value) ||
        (isNilAttributeValue(value) && isKnownAttribute(attributeName)) ||
        isDictionaryItemAttributeValue(value)
    );
};

export const isNumberAttributeValue = (value: unknown): value is number => typeof value === 'number';
export const isBooleanAttributeValue = (value: unknown): value is boolean => typeof value === 'boolean';
export const isStringAttributeValue = (value: unknown): value is string => typeof value === 'string';
export const isNilAttributeValue = (value: unknown): value is null => isNil(value);
export const isDictionaryItemAttributeValue = (value: unknown): value is DictionaryItemBrief => {
    if (isNilAttributeValue(value)) {
        return false;
    }

    const requiredKeys: (keyof DictionaryItemBrief)[] = ['uuid', 'key', 'dictionary'];
    const keys = typeof value === 'object' ? Object.getOwnPropertyNames(value) : [];

    return requiredKeys.every((rk) => keys.includes(rk));
};
