import uniqueId from 'lodash/uniqueId';
import range from 'lodash/range';

import {
    Aggregate,
    AggregateSectionName,
    AttributeObservableEntity,
    AttributeValueType,
    CountryCode,
    DictionaryBrief,
    DictionaryItemBrief,
    FactOfAffectedCountries,
    FactOfAssociatedAttribute,
    FactOfAttribute,
    FactOfCampaigns,
    FactOfDomainNameIsDelegated,
    FactOfDomainNameStatuses,
    FactOfEmailAddressDisplayNames,
    FactOfExploitedVulnerabilities,
    FactOfFileMalwareNames,
    FactOfFileNames,
    FactOfFileSize,
    FactOfIdentityClass,
    FactOfIdentityNames,
    FactOfIdentitySectors,
    FactOfIpAddressASN,
    FactOfIpAddressRegionalInternetRegistry,
    FactOfIpAddressStatuses,
    FactOfIsDGA,
    FactOfIsIoC,
    FactOfIsTrusted,
    FactOfMalwareClasses,
    FactOfMalwareFamilies,
    FactOfNodeRole,
    FactOfPlatforms,
    FactOfPotentialDamage,
    FactOfRegistrationCountry,
    FactOfRelatedMalwareFamilies,
    FactOfRelatedThreatCategory,
    FactOfTargetedSectors,
    FactOfThreatActors,
    FactOfThreatCategory,
    IdentityClass,
    NODE_ROLES,
    NodeRole,
    ObservableEntityType,
    PotentialDamage,
    RegionalInternetRegistry,
    RelatedThreatCategory,
    ThreatCategory
} from '../../../api/models';

export const buildDictionaryBrief = (dictionaryUUID: string): DictionaryBrief => ({
    uuid: dictionaryUUID,
    name: dictionaryUUID
});

export const buildDictionaryItemBrief = (
    uuid: string,
    key: string,
    opts?: { dictionaryId?: string }
): DictionaryItemBrief => ({
    uuid,
    key,
    dictionary: buildDictionaryBrief(opts?.dictionaryId || uniqueId('dictionary-id-'))
});

export const buildDictionaryItemsBriefs = (keys: string[], opts?: { dictionaryId?: string }): DictionaryItemBrief[] =>
    keys.map((key, index) =>
        buildDictionaryItemBrief(index.toString(), key, {
            dictionaryId: opts?.dictionaryId || uniqueId('dictionary-id-')
        })
    );

export const buildFactOfAttribute = <AttributeName extends AttributeObservableEntity, ValueType>(
    attributeName: AttributeName,
    values: ValueType[],
    confidences: number[] = []
): FactOfAttribute<AttributeName, ValueType> => ({
    attributeName,
    hasConflicts: false,
    value: values[0],
    values: values.map((value, index) => ({ value, confidence: confidences[index] || 1 / (index + 1) }))
});

export const buildFactOfThreatCategory = (
    value: AttributeValueType<AttributeObservableEntity.ThreatCategory>,
    confidence: number = 1
): FactOfThreatCategory => buildFactOfAttribute(AttributeObservableEntity.ThreatCategory, [value], [confidence]);

export const buildFactOfRelatedThreatCategory = (
    value: AttributeValueType<AttributeObservableEntity.RelatedThreatCategory>,
    confidence: number = 1
): FactOfRelatedThreatCategory =>
    buildFactOfAttribute(AttributeObservableEntity.RelatedThreatCategory, [value], [confidence]);

export const buildFactOfIsIoC = (value: boolean, confidence: number = 1): FactOfIsIoC =>
    buildFactOfAttribute(AttributeObservableEntity.IsIoC, value ? [value] : [], [confidence]);

export const buildFactOfIsTrusted = (value: boolean, confidence: number = 1): FactOfIsTrusted =>
    buildFactOfAttribute(AttributeObservableEntity.IsTrusted, value ? [value] : [], [confidence]);

export const buildFactOfIsDGA = (value: boolean, confidence: number = 1): FactOfIsDGA =>
    buildFactOfAttribute(AttributeObservableEntity.IsDGA, value ? [value] : [], [confidence]);

export const buildFactOfIsDelegated = (value: boolean, confidence: number = 1): FactOfDomainNameIsDelegated =>
    buildFactOfAttribute(AttributeObservableEntity.IsDelegated, value ? [value] : [], [confidence]);

export const buildFactOfClass = (value: IdentityClass, confidence: number = 1): FactOfIdentityClass =>
    buildFactOfAttribute(AttributeObservableEntity.Class, [value], [confidence]);

export const buildFactOfASN = (value: number | null, confidence: number = 1): FactOfIpAddressASN =>
    buildFactOfAttribute(AttributeObservableEntity.ASN, value ? [value] : [], [confidence]);

export const buildFactOfRegionalInternetRegistry = (
    value: RegionalInternetRegistry | null,
    confidence: number = 1
): FactOfIpAddressRegionalInternetRegistry =>
    buildFactOfAttribute(AttributeObservableEntity.RegionalInternetRegistry, value ? [value] : [], [confidence]);

export const buildFactOfSize = (value: number | null, confidence: number = 1): FactOfFileSize =>
    buildFactOfAttribute(AttributeObservableEntity.Size, value ? [value] : [], [confidence]);

export const buildFactOfNames = (values: string[], confidences: number[] = []): FactOfFileNames | FactOfIdentityNames =>
    buildFactOfAttribute(AttributeObservableEntity.Names, values, confidences);

export const buildFactOfDisplayNames = (values: string[], confidences: number[] = []): FactOfEmailAddressDisplayNames =>
    buildFactOfAttribute(AttributeObservableEntity.DisplayNames, values, confidences);

export const buildFactOfMalwareNames = (values: string[], confidences: number[] = []): FactOfFileMalwareNames =>
    buildFactOfAttribute(AttributeObservableEntity.MalwareNames, values, confidences);

export const buildFactOfSectors = (values: DictionaryItemBrief[], confidences: number[] = []): FactOfIdentitySectors =>
    buildFactOfAttribute(AttributeObservableEntity.Sectors, values, confidences);

export const buildFactOfNodeRoles = (values: NodeRole[], confidences: number[] = []): FactOfNodeRole =>
    buildFactOfAttribute(AttributeObservableEntity.NodeRoles, values, confidences);

export const buildFactOfStatuses = (
    values: DictionaryItemBrief[],
    confidences: number[] = []
): FactOfIpAddressStatuses | FactOfDomainNameStatuses =>
    buildFactOfAttribute(AttributeObservableEntity.Statuses, values, confidences);

export const buildFactOfMalwareClasses = (
    values: DictionaryItemBrief[],
    confidences: number[] = []
): FactOfMalwareClasses => buildFactOfAttribute(AttributeObservableEntity.MalwareClasses, values, confidences);

export const buildFactOfMalwareFamilies = (
    values: DictionaryItemBrief[],
    confidences: number[] = []
): FactOfMalwareFamilies => buildFactOfAttribute(AttributeObservableEntity.MalwareFamilies, values, confidences);

export const buildFactOfRelatedMalwareFamilies = (
    values: DictionaryItemBrief[],
    confidences: number[] = []
): FactOfRelatedMalwareFamilies =>
    buildFactOfAttribute(AttributeObservableEntity.RelatedMalwareFamilies, values, confidences);

export const buildFactOfCampaigns = (values: DictionaryItemBrief[], confidences: number[] = []): FactOfCampaigns =>
    buildFactOfAttribute(AttributeObservableEntity.Campaigns, values, confidences);

export const buildFactOfThreatActors = (
    values: DictionaryItemBrief[],
    confidences: number[] = []
): FactOfThreatActors => buildFactOfAttribute(AttributeObservableEntity.ThreatActors, values, confidences);

export const buildFactOfAffectedCountries = (
    values: DictionaryItemBrief[],
    confidences: number[] = []
): FactOfAffectedCountries => buildFactOfAttribute(AttributeObservableEntity.AffectedCountries, values, confidences);

export const buildFactOfRegistrationCountry = (
    values: DictionaryItemBrief[],
    confidences: number[] = []
): FactOfRegistrationCountry =>
    buildFactOfAttribute(AttributeObservableEntity.RegistrationCountry, values, confidences);

export const buildFactOfExploitedVulnerabilities = (
    values: DictionaryItemBrief[],
    confidences: number[] = []
): FactOfExploitedVulnerabilities =>
    buildFactOfAttribute(AttributeObservableEntity.ExploitedVulnerabilities, values, confidences);

export const buildFactOfTargetedSectors = (
    values: DictionaryItemBrief[],
    confidences: number[] = []
): FactOfTargetedSectors => buildFactOfAttribute(AttributeObservableEntity.TargetedSectors, values, confidences);

export const buildFactOfPotentialDamage = (
    values: PotentialDamage | null,
    confidence: number = 1
): FactOfPotentialDamage =>
    buildFactOfAttribute(AttributeObservableEntity.PotentialDamage, values ? [values] : [], [confidence]);

export const buildFactOfPlatforms = (values: DictionaryItemBrief[], confidence: number[] = []): FactOfPlatforms =>
    buildFactOfAttribute(AttributeObservableEntity.Platforms, values, confidence);

export const buildFactOfUnknownAttribute = (
    name: string,
    values: string[] | null[],
    confidence: number[] = []
): FactOfAttribute<AttributeObservableEntity, string | null> =>
    buildFactOfAttribute(name as AttributeObservableEntity, values, confidence);

const LABELS: string[] = range(10).map((i) => `Label ${i}`);
const MALWARE_CLASSES: string[] = range(3).map((i) => `Malware class ${i}`);
const MALWARE_FAMILIES: string[] = range(3).map((i) => `Malware family ${i}`);
const MALWARE_NAMES: string[] = range(3).map((i) => `Malware name ${i}`);
const FILE_NAMES: string[] = range(3).map((i) => `File name ${i}`);
const DISPLAY_NAMES: string[] = range(3).map((i) => `Display name ${i}`);
const STATUSES: string[] = range(3).map((i) => `Status ${i}`);
const SECTORS: string[] = range(3).map((i) => `Sector name ${i}`);
const CAMPAIGNS: string[] = range(3).map((i) => `Campaign name ${i}`);
const THREAT_ACTORS: string[] = range(3).map((i) => `Threat actor name ${i}`);
const COUNTRIES: string[] = range(3).map((i) => `Country name ${i}`);
const VULNERABILITIES: string[] = range(3).map((i) => `Vulnerability name ${i}`);
const COUNTRYCODES: CountryCode[] = range(1).map(() => CountryCode.RUS);
const PLATFORMS: string[] = range(3).map((i) => `Platform ${i}`);

interface AggregateData {
    fill: Aggregate;
    empty: Aggregate;
}

export const FileAggregateData: AggregateData = {
    fill: {
        uuid: '1',
        type: ObservableEntityType.File,
        keys: [
            { type: 'MD5Hash', value: 'c4ca4238a0b923820dcc509a6f75849b' },
            { type: 'SHA1Hash', value: '356a192b7913b04c54574d18c28d46e6395428ab' },
            { type: 'SHA256Hash', value: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b' }
        ],
        sections: [
            {
                name: AggregateSectionName.AssociatedAttributes,
                data: [
                    buildFactOfThreatCategory(ThreatCategory.Malware),
                    buildFactOfIsIoC(true),
                    buildFactOfIsTrusted(true),
                    buildFactOfMalwareClasses(buildDictionaryItemsBriefs(MALWARE_CLASSES)),
                    buildFactOfMalwareFamilies(buildDictionaryItemsBriefs(MALWARE_FAMILIES)),
                    buildFactOfCampaigns(buildDictionaryItemsBriefs(CAMPAIGNS)),
                    buildFactOfThreatActors(buildDictionaryItemsBriefs(THREAT_ACTORS)),
                    buildFactOfAffectedCountries(buildDictionaryItemsBriefs(COUNTRIES)),
                    buildFactOfExploitedVulnerabilities(buildDictionaryItemsBriefs(VULNERABILITIES)),
                    buildFactOfTargetedSectors(buildDictionaryItemsBriefs(SECTORS)),
                    buildFactOfPotentialDamage(PotentialDamage.High),
                    buildFactOfUnknownAttribute('UnknownAttribute', [
                        'Unknown value'
                    ]) as FactOfAssociatedAttribute<ObservableEntityType.File>
                ]
            },
            {
                name: AggregateSectionName.NaturalAttributes,
                data: [
                    buildFactOfSize(1200),
                    buildFactOfNames(FILE_NAMES),
                    buildFactOfMalwareNames(MALWARE_NAMES),
                    buildFactOfPlatforms(buildDictionaryItemsBriefs(PLATFORMS))
                ]
            },
            {
                name: AggregateSectionName.Labels,
                data: {
                    labels: LABELS
                }
            }
        ]
    },

    empty: {
        uuid: '1',
        type: ObservableEntityType.File,
        keys: [
            { type: 'MD5Hash', value: 'c4ca4238a0b923820dcc509a6f75849b' },
            { type: 'SHA1Hash', value: '356a192b7913b04c54574d18c28d46e6395428ab' },
            { type: 'SHA256Hash', value: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b' }
        ],
        sections: [
            {
                name: AggregateSectionName.AssociatedAttributes,
                data: [
                    buildFactOfThreatCategory(null),
                    buildFactOfIsIoC(false),
                    buildFactOfIsTrusted(false),
                    buildFactOfMalwareClasses(buildDictionaryItemsBriefs([])),
                    buildFactOfMalwareFamilies(buildDictionaryItemsBriefs([])),
                    buildFactOfCampaigns(buildDictionaryItemsBriefs([])),
                    buildFactOfThreatActors(buildDictionaryItemsBriefs([])),
                    buildFactOfAffectedCountries(buildDictionaryItemsBriefs([])),
                    buildFactOfExploitedVulnerabilities(buildDictionaryItemsBriefs([])),
                    buildFactOfTargetedSectors(buildDictionaryItemsBriefs([])),
                    buildFactOfPotentialDamage(null),
                    buildFactOfUnknownAttribute('UnknownAttribute', [
                        'Unknown value'
                    ]) as FactOfAssociatedAttribute<ObservableEntityType.File>,
                    buildFactOfUnknownAttribute('UnknownAttributeWithNullValue', [
                        null
                    ]) as FactOfAssociatedAttribute<ObservableEntityType.File>
                ]
            },
            {
                name: AggregateSectionName.NaturalAttributes,
                data: [
                    buildFactOfSize(null),
                    buildFactOfNames([]),
                    buildFactOfMalwareNames([]),
                    buildFactOfPlatforms(buildDictionaryItemsBriefs([]))
                ]
            },
            {
                name: AggregateSectionName.Labels,
                data: {
                    labels: []
                }
            }
        ]
    }
};

export const IPAddressAggregateData: AggregateData = {
    fill: {
        uuid: '1',
        type: ObservableEntityType.IPAddress,
        keys: [{ type: 'String', value: '1.1.1.1' }],
        sections: [
            {
                name: AggregateSectionName.AssociatedAttributes,
                data: [
                    buildFactOfRelatedThreatCategory(RelatedThreatCategory.Malware),
                    buildFactOfIsIoC(true),
                    buildFactOfIsTrusted(true),
                    buildFactOfNodeRoles(NODE_ROLES),
                    buildFactOfRelatedMalwareFamilies(buildDictionaryItemsBriefs(MALWARE_FAMILIES)),
                    buildFactOfCampaigns(buildDictionaryItemsBriefs(CAMPAIGNS)),
                    buildFactOfThreatActors(buildDictionaryItemsBriefs(THREAT_ACTORS)),
                    buildFactOfAffectedCountries(buildDictionaryItemsBriefs(COUNTRIES)),
                    buildFactOfExploitedVulnerabilities(buildDictionaryItemsBriefs(VULNERABILITIES)),
                    buildFactOfTargetedSectors(buildDictionaryItemsBriefs(SECTORS)),
                    buildFactOfRegistrationCountry(buildDictionaryItemsBriefs(COUNTRYCODES)),
                    buildFactOfPotentialDamage(PotentialDamage.High),
                    buildFactOfUnknownAttribute('UnknownAttribute', [
                        'Unknown value'
                    ]) as FactOfAssociatedAttribute<ObservableEntityType.IPAddress>
                ]
            },
            {
                name: AggregateSectionName.NaturalAttributes,
                data: [
                    buildFactOfRegionalInternetRegistry(RegionalInternetRegistry.AFRINIC),
                    buildFactOfASN(1456),
                    buildFactOfStatuses(buildDictionaryItemsBriefs(STATUSES))
                ]
            },
            {
                name: AggregateSectionName.Labels,
                data: {
                    labels: LABELS
                }
            }
        ]
    },
    empty: {
        uuid: '1',
        type: ObservableEntityType.IPAddress,
        keys: [{ type: 'String', value: '1.1.1.1' }],
        sections: [
            {
                name: AggregateSectionName.AssociatedAttributes,
                data: [
                    buildFactOfRelatedThreatCategory(null),
                    buildFactOfIsIoC(false),
                    buildFactOfIsTrusted(false),
                    buildFactOfNodeRoles([]),
                    buildFactOfRelatedMalwareFamilies([]),
                    buildFactOfCampaigns(buildDictionaryItemsBriefs([])),
                    buildFactOfThreatActors(buildDictionaryItemsBriefs([])),
                    buildFactOfAffectedCountries(buildDictionaryItemsBriefs([])),
                    buildFactOfExploitedVulnerabilities(buildDictionaryItemsBriefs([])),
                    buildFactOfTargetedSectors(buildDictionaryItemsBriefs([])),
                    buildFactOfUnknownAttribute('UnknownAttribute', [
                        'Unknown value'
                    ]) as FactOfAssociatedAttribute<ObservableEntityType.IPAddress>
                ]
            },
            {
                name: AggregateSectionName.NaturalAttributes,
                data: [buildFactOfRegionalInternetRegistry(null), buildFactOfASN(null), buildFactOfStatuses([])]
            },
            {
                name: AggregateSectionName.Labels,
                data: {
                    labels: []
                }
            }
        ]
    }
};

export const DomainNameAggregateData: AggregateData = {
    fill: {
        uuid: '1',
        type: ObservableEntityType.DomainName,
        keys: [{ type: 'String', value: 'example.com' }],
        sections: [
            {
                name: AggregateSectionName.AssociatedAttributes,
                data: [
                    buildFactOfRelatedThreatCategory(RelatedThreatCategory.Malware),
                    buildFactOfIsIoC(true),
                    buildFactOfIsTrusted(true),
                    buildFactOfIsDGA(true),
                    buildFactOfNodeRoles(NODE_ROLES),
                    buildFactOfRelatedMalwareFamilies(buildDictionaryItemsBriefs(MALWARE_FAMILIES)),
                    buildFactOfCampaigns(buildDictionaryItemsBriefs(CAMPAIGNS)),
                    buildFactOfThreatActors(buildDictionaryItemsBriefs(THREAT_ACTORS)),
                    buildFactOfAffectedCountries(buildDictionaryItemsBriefs(COUNTRIES)),
                    buildFactOfExploitedVulnerabilities(buildDictionaryItemsBriefs(VULNERABILITIES)),
                    buildFactOfTargetedSectors(buildDictionaryItemsBriefs(SECTORS)),
                    buildFactOfPotentialDamage(PotentialDamage.High),
                    buildFactOfUnknownAttribute('UnknownAttribute', [
                        'Unknown value'
                    ]) as FactOfAssociatedAttribute<ObservableEntityType.DomainName>
                ]
            },
            {
                name: AggregateSectionName.NaturalAttributes,
                data: [buildFactOfIsDelegated(true), buildFactOfStatuses(buildDictionaryItemsBriefs(STATUSES))]
            },
            {
                name: AggregateSectionName.Labels,
                data: {
                    labels: LABELS
                }
            }
        ]
    },
    empty: {
        uuid: '1',
        type: ObservableEntityType.DomainName,
        keys: [{ type: 'String', value: 'example.com' }],
        sections: [
            {
                name: AggregateSectionName.AssociatedAttributes,
                data: [
                    buildFactOfRelatedThreatCategory(null),
                    buildFactOfIsIoC(false),
                    buildFactOfIsTrusted(false),
                    buildFactOfIsDGA(false),
                    buildFactOfNodeRoles([]),
                    buildFactOfRelatedMalwareFamilies([]),
                    buildFactOfCampaigns(buildDictionaryItemsBriefs([])),
                    buildFactOfThreatActors(buildDictionaryItemsBriefs([])),
                    buildFactOfAffectedCountries(buildDictionaryItemsBriefs([])),
                    buildFactOfExploitedVulnerabilities(buildDictionaryItemsBriefs([])),
                    buildFactOfTargetedSectors(buildDictionaryItemsBriefs([])),
                    buildFactOfUnknownAttribute('UnknownAttribute', [
                        'Unknown value'
                    ]) as FactOfAssociatedAttribute<ObservableEntityType.DomainName>
                ]
            },
            {
                name: AggregateSectionName.NaturalAttributes,
                data: [buildFactOfIsDelegated(false), buildFactOfStatuses([])]
            },
            {
                name: AggregateSectionName.Labels,
                data: {
                    labels: []
                }
            }
        ]
    }
};

export const UrlAggregateData: AggregateData = {
    fill: {
        uuid: '1',
        type: ObservableEntityType.URL,
        keys: [{ type: 'String', value: 'https://www.example.com' }],
        sections: [
            {
                name: AggregateSectionName.AssociatedAttributes,
                data: [
                    buildFactOfRelatedThreatCategory(RelatedThreatCategory.Malware),
                    buildFactOfIsIoC(true),
                    buildFactOfIsTrusted(true),
                    buildFactOfRelatedMalwareFamilies(buildDictionaryItemsBriefs(MALWARE_FAMILIES)),
                    buildFactOfCampaigns(buildDictionaryItemsBriefs(CAMPAIGNS)),
                    buildFactOfThreatActors(buildDictionaryItemsBriefs(THREAT_ACTORS)),
                    buildFactOfAffectedCountries(buildDictionaryItemsBriefs(COUNTRIES)),
                    buildFactOfExploitedVulnerabilities(buildDictionaryItemsBriefs(VULNERABILITIES)),
                    buildFactOfTargetedSectors(buildDictionaryItemsBriefs(SECTORS)),
                    buildFactOfPotentialDamage(PotentialDamage.High),
                    buildFactOfUnknownAttribute('UnknownAttribute', [
                        'Unknown value'
                    ]) as FactOfAssociatedAttribute<ObservableEntityType.URL>
                ]
            },
            {
                name: AggregateSectionName.Labels,
                data: {
                    labels: LABELS
                }
            }
        ]
    },

    empty: {
        uuid: '1',
        type: ObservableEntityType.URL,
        keys: [{ type: 'String', value: 'https://www.example.com' }],
        sections: [
            {
                name: AggregateSectionName.AssociatedAttributes,
                data: [
                    buildFactOfRelatedThreatCategory(null),
                    buildFactOfIsIoC(false),
                    buildFactOfIsTrusted(false),
                    buildFactOfRelatedMalwareFamilies([]),
                    buildFactOfCampaigns(buildDictionaryItemsBriefs([])),
                    buildFactOfThreatActors(buildDictionaryItemsBriefs([])),
                    buildFactOfAffectedCountries(buildDictionaryItemsBriefs([])),
                    buildFactOfExploitedVulnerabilities(buildDictionaryItemsBriefs([])),
                    buildFactOfTargetedSectors(buildDictionaryItemsBriefs([])),
                    buildFactOfUnknownAttribute('UnknownAttribute', [
                        'Unknown value'
                    ]) as FactOfAssociatedAttribute<ObservableEntityType.URL>
                ]
            },
            {
                name: AggregateSectionName.Labels,
                data: {
                    labels: []
                }
            }
        ]
    }
};

export const EmailAddressAggregateData: AggregateData = {
    fill: {
        uuid: '1',
        type: ObservableEntityType.EmailAddress,
        keys: [{ type: 'String', value: 'test@example.com' }],
        sections: [
            {
                name: AggregateSectionName.AssociatedAttributes,
                data: [
                    buildFactOfRelatedThreatCategory(RelatedThreatCategory.Malware),
                    buildFactOfIsIoC(true),
                    buildFactOfIsTrusted(true),
                    buildFactOfRelatedMalwareFamilies(buildDictionaryItemsBriefs(MALWARE_FAMILIES)),
                    buildFactOfCampaigns(buildDictionaryItemsBriefs(CAMPAIGNS)),
                    buildFactOfThreatActors(buildDictionaryItemsBriefs(THREAT_ACTORS)),
                    buildFactOfAffectedCountries(buildDictionaryItemsBriefs(COUNTRIES)),
                    buildFactOfExploitedVulnerabilities(buildDictionaryItemsBriefs(VULNERABILITIES)),
                    buildFactOfTargetedSectors(buildDictionaryItemsBriefs(SECTORS)),
                    buildFactOfUnknownAttribute('UnknownAttribute', [
                        'Unknown value'
                    ]) as FactOfAssociatedAttribute<ObservableEntityType.EmailAddress>
                ]
            },
            {
                name: AggregateSectionName.NaturalAttributes,
                data: [buildFactOfDisplayNames(DISPLAY_NAMES)]
            },
            {
                name: AggregateSectionName.Labels,
                data: {
                    labels: LABELS
                }
            }
        ]
    },

    empty: {
        uuid: '1',
        type: ObservableEntityType.EmailAddress,
        keys: [{ type: 'String', value: 'test@example.com' }],
        sections: [
            {
                name: AggregateSectionName.AssociatedAttributes,
                data: [
                    buildFactOfRelatedThreatCategory(null),
                    buildFactOfIsIoC(false),
                    buildFactOfIsTrusted(false),
                    buildFactOfRelatedMalwareFamilies([]),
                    buildFactOfCampaigns(buildDictionaryItemsBriefs([])),
                    buildFactOfThreatActors(buildDictionaryItemsBriefs([])),
                    buildFactOfAffectedCountries(buildDictionaryItemsBriefs([])),
                    buildFactOfExploitedVulnerabilities(buildDictionaryItemsBriefs([])),
                    buildFactOfUnknownAttribute('UnknownAttribute', [
                        'Unknown value'
                    ]) as FactOfAssociatedAttribute<ObservableEntityType.EmailAddress>,
                    buildFactOfTargetedSectors(buildDictionaryItemsBriefs([]))
                ]
            },
            {
                name: AggregateSectionName.NaturalAttributes,
                data: [buildFactOfDisplayNames([])]
            },
            {
                name: AggregateSectionName.Labels,
                data: {
                    labels: []
                }
            }
        ]
    }
};
