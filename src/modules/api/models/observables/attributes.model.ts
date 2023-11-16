import { DictionaryItemBrief } from '../dictionaries';

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

// prettier-ignore
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
    AttributeName extends AttributeObservableEntity.ThreatCategory ? ThreatCategory :
    AttributeName extends AttributeObservableEntity.RelatedThreatCategory ? RelatedThreatCategory :
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
        | PotentialDamage;

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

export enum RegionalInternetRegistry {
    RIPE = 'RIPE',
    APNIC = 'APNIC',
    ARIN = 'ARIN',
    AFRINIC = 'AFRINIC',
    LACNIC = 'LACNIC'
}

export enum IdentityClass {
    Individual = 'Individual',
    Group = 'Group',
    Organization = 'Organization',
    Class = 'Class'
}

export enum ThreatCategory {
    Malware = 'Malware',
    Adware = 'Adware',
    Riskware = 'Riskware',
    Clean = 'Clean'
}

export enum RelatedThreatCategory {
    Malware = 'Malware',
    Adware = 'Adware',
    Riskware = 'Riskware'
}

export enum PotentialDamage {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low'
}
