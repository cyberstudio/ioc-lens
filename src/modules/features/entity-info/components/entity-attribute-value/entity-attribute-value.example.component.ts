import { EntityAttributeValueComponent } from './entity-attribute-value.component';
import { Component, createExample, renderComponent } from '../../../../shared/utils';

import './entity-attribute-value.example.component.css';
import { TranslateService } from '../../../../shared/services';
import {
    AttributeObservableEntity,
    AttributeValueType,
    IDENTITY_CLASSES,
    NODE_ROLES,
    POTENTIAL_DAMAGES,
    REGIONAL_INTERNET_REGISTRIES,
    RELATED_THREAT_CATEGORIES,
    StaticDictionaryId,
    THREAT_CATEGORIES
} from '../../../../api/models';

class EntityAttributeValueExampleComponent extends Component<void> {
    protected createComponent(): HTMLElement {
        const translateService = new TranslateService();

        const el = this.parseTemplate('<div class="kbq-entity-attribute-value-example"></div>');

        const data: { attributeName: AttributeObservableEntity | string; values: AttributeValueType[] }[] = [
            { attributeName: AttributeObservableEntity.IsIoC, values: [true] },
            { attributeName: AttributeObservableEntity.IsTrusted, values: [true] },
            { attributeName: AttributeObservableEntity.IsDGA, values: [true] },
            {
                attributeName: AttributeObservableEntity.ThreatCategory,
                values: [...THREAT_CATEGORIES, null]
            },
            {
                attributeName: AttributeObservableEntity.RelatedThreatCategory,
                values: [...RELATED_THREAT_CATEGORIES, null]
            },
            {
                attributeName: AttributeObservableEntity.PotentialDamage,
                values: [...POTENTIAL_DAMAGES]
            },
            {
                attributeName: AttributeObservableEntity.NodeRoles,
                values: [...NODE_ROLES]
            },
            {
                attributeName: AttributeObservableEntity.RegionalInternetRegistry,
                values: [...REGIONAL_INTERNET_REGISTRIES]
            },
            {
                attributeName: AttributeObservableEntity.Class,
                values: [...IDENTITY_CLASSES]
            },
            {
                attributeName: AttributeObservableEntity.ASN,
                values: [1234]
            },
            {
                attributeName: AttributeObservableEntity.Size,
                values: [1231445]
            },
            {
                attributeName: AttributeObservableEntity.Names,
                values: ['Some name']
            },
            {
                attributeName: AttributeObservableEntity.DisplayNames,
                values: ['Some display name']
            },
            {
                attributeName: AttributeObservableEntity.Sectors,
                values: [
                    {
                        uuid: '1',
                        key: 'Sector name 1',
                        dictionary: { uuid: StaticDictionaryId.Sectors, name: 'Sectors' }
                    }
                ]
            },
            {
                attributeName: AttributeObservableEntity.TargetedSectors,
                values: [
                    {
                        uuid: '1',
                        key: 'Sector 1',
                        dictionary: {
                            uuid: StaticDictionaryId.Sectors,
                            name: 'Sectors'
                        }
                    }
                ]
            },
            {
                attributeName: AttributeObservableEntity.RegistrationCountry,
                values: [
                    {
                        uuid: '1',
                        key: 'RUS',
                        dictionary: {
                            uuid: StaticDictionaryId.CountryCodes,
                            name: 'CountryCodes'
                        }
                    }
                ]
            },
            {
                attributeName: AttributeObservableEntity.AffectedCountries,
                values: [
                    {
                        uuid: '1',
                        key: 'USA',
                        dictionary: { uuid: StaticDictionaryId.CountryCodes, name: 'CountryCodes' }
                    }
                ]
            },
            {
                attributeName: AttributeObservableEntity.Campaigns,
                values: [
                    {
                        uuid: '1',
                        key: 'Campaign 1',
                        dictionary: { uuid: StaticDictionaryId.Campaigns, name: 'Campaigns' }
                    }
                ]
            },
            {
                attributeName: AttributeObservableEntity.ExploitedVulnerabilities,
                values: [
                    {
                        uuid: '1',
                        key: 'Vulnerability 1',
                        dictionary: {
                            uuid: StaticDictionaryId.Vulnerabilities,
                            name: 'Vulnerabilities'
                        }
                    }
                ]
            },
            {
                attributeName: AttributeObservableEntity.MalwareClasses,
                values: [
                    {
                        uuid: '1',
                        key: 'Malware classes 1',
                        dictionary: {
                            uuid: StaticDictionaryId.MalwareClasses,
                            name: 'MalwareClasses'
                        }
                    }
                ]
            },
            {
                attributeName: AttributeObservableEntity.MalwareFamilies,
                values: [
                    {
                        uuid: '1',
                        key: 'Malware family 1',
                        dictionary: {
                            uuid: StaticDictionaryId.MalwareFamilies,
                            name: 'MalwareFamilies'
                        }
                    }
                ]
            },
            {
                attributeName: AttributeObservableEntity.RelatedMalwareFamilies,
                values: [
                    {
                        uuid: '1',
                        key: 'Related malware family 1',
                        dictionary: {
                            uuid: StaticDictionaryId.MalwareFamilies,
                            name: 'MalwareFamilies'
                        }
                    }
                ]
            },
            {
                attributeName: AttributeObservableEntity.MalwareNames,
                values: ['Malware name']
            },
            {
                attributeName: AttributeObservableEntity.Platforms,
                values: [
                    {
                        uuid: '1',
                        key: 'Platform 1',
                        dictionary: {
                            uuid: StaticDictionaryId.Platforms,
                            name: 'Platforms'
                        }
                    }
                ]
            },
            {
                attributeName: AttributeObservableEntity.Statuses,
                values: [
                    {
                        uuid: '1',
                        key: 'Status 1',
                        dictionary: {
                            uuid: StaticDictionaryId.IpAddressStatuses,
                            name: 'IpAddressStatuses'
                        }
                    }
                ]
            },
            {
                attributeName: AttributeObservableEntity.ThreatActors,
                values: [
                    {
                        uuid: '1',
                        key: 'Threat actors 1',
                        dictionary: {
                            uuid: StaticDictionaryId.ThreatActors,
                            name: 'ThreatActors'
                        }
                    }
                ]
            },
            {
                attributeName: 'UnknownAttribute',
                values: [
                    1,
                    true,
                    'Unknown attribute value as string',
                    {
                        uuid: '1',
                        key: 'Unknown attribute value as dictionary item',
                        dictionary: {
                            uuid: StaticDictionaryId.ThreatActors,
                            name: 'ThreatActors'
                        }
                    }
                ]
            }
        ];

        const variantsWrapper = this.parseTemplate('<div class="kbq-entity-attribute-value-example__row"></div>');

        data.forEach((params) => {
            variantsWrapper.appendChild(this.parseTemplate(`<h3 class="subheading">${params.attributeName}</h3>`));

            params.values.forEach((value) => {
                const variant = new EntityAttributeValueComponent(
                    {
                        attributeName: params.attributeName,
                        value,
                        confidence: value === null ? null : 1
                    },
                    translateService
                );

                renderComponent(variantsWrapper, variant);
            });
        });

        el.appendChild(variantsWrapper);

        return el;
    }
}

export const entityAttributeValueComponentExample = createExample(
    'Entity attribute value',
    new EntityAttributeValueExampleComponent()
);
