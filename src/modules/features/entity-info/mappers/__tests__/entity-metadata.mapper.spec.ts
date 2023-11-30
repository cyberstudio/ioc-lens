import { test } from 'uvu';
import * as assert from 'uvu/assert';

import {
    Aggregate,
    AggregateSectionName,
    AttributeObservableEntity,
    ObservableEntityType
} from '../../../../api/models';
import { EntityFullInfoModel } from '../../models';
import { EntityMetadataMapper } from '../entity-metadata.mapper';
import { EntityMetadata, FileMetadata } from '../../models/entity-metadata.model';
import { HashSumType } from '../hash-sum.mapper';

test('should move unknown attributes to the end of the list', async () => {
    const environment = prepareEnvironment();

    const entity = EntityMetadataMapper.fromModel(environment.domainModel) as EntityMetadata;
    const lastAttributeIndex = entity.attributes.length - 1;
    const attributeName = entity.attributes[lastAttributeIndex].attributeName;
    const isKnownLastAttribute = environment.domainKnownAttributes.includes(attributeName as AttributeObservableEntity);

    assert.equal(isKnownLastAttribute, false);
});

test('should add hash sums for files', async () => {
    const environment = prepareEnvironment();
    const entity = EntityMetadataMapper.fromModel(environment.fileModel) as FileMetadata;

    assert.equal(entity.hashSums, [
        {
            type: HashSumType.MD5,
            value: null
        },
        {
            type: HashSumType.SHA1,
            value: null
        },
        {
            type: HashSumType.SHA256,
            value: '56a35e6de83b7a6e9ecb731a5a636e91ab32899eb90fbec24c8f4d40467ca5d9'
        }
    ]);
});

const prepareEnvironment = () => {
    const domainAggragate: Aggregate = {
        type: ObservableEntityType.DomainName,
        uuid: '04a065d5-27c5-4ada-b091-c2a8f8123849',
        keys: [
            {
                type: 'String',
                value: 'sitefmonitor.com'
            }
        ],
        sections: [
            {
                name: AggregateSectionName.Labels,
                data: {
                    labels: []
                }
            },
            {
                name: AggregateSectionName.NaturalAttributes,
                data: [
                    {
                        attributeName: AttributeObservableEntity.Statuses,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.IsDelegated,
                        value: null,
                        values: [],
                        hasConflicts: false
                    }
                ]
            },
            {
                name: AggregateSectionName.AssociatedAttributes,
                data: [
                    {
                        attributeName: AttributeObservableEntity.IsTrusted,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.IsIoC,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.NodeRoles,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.IsDGA,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: 'NewAttribute1',
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.RelatedMalwareFamilies,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.RelatedThreatCategory,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.AffectedCountries,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: 'NewAttribute2',
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.ThreatActors,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.Campaigns,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.TargetedSectors,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.ExploitedVulnerabilities,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.PotentialDamage,
                        value: null,
                        values: [],
                        hasConflicts: false
                    }
                ]
            }
        ]
    };

    const fileAggragate: Aggregate = {
        type: ObservableEntityType.File,
        uuid: 'd42d26b1-fd60-48d1-9205-25b6d0c7b51f',
        keys: [
            {
                type: 'SHA256Hash',
                value: '56a35e6de83b7a6e9ecb731a5a636e91ab32899eb90fbec24c8f4d40467ca5d9'
            }
        ],
        sections: [
            {
                name: AggregateSectionName.Labels,
                data: {
                    labels: []
                }
            },
            {
                name: AggregateSectionName.NaturalAttributes,
                data: [
                    {
                        attributeName: AttributeObservableEntity.Names,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.Size,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.MalwareNames,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.Platforms,
                        value: null,
                        values: [],
                        hasConflicts: false
                    }
                ]
            },
            {
                name: AggregateSectionName.AssociatedAttributes,
                data: [
                    {
                        attributeName: AttributeObservableEntity.IsIoC,
                        value: true,
                        values: [
                            {
                                value: true,
                                confidence: 1
                            }
                        ],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.IsTrusted,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.MalwareFamilies,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.MalwareClasses,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.ThreatCategory,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.AffectedCountries,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.ThreatActors,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.Campaigns,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.TargetedSectors,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.ExploitedVulnerabilities,
                        value: null,
                        values: [],
                        hasConflicts: false
                    },
                    {
                        attributeName: AttributeObservableEntity.PotentialDamage,
                        value: null,
                        values: [],
                        hasConflicts: false
                    }
                ]
            }
        ]
    };

    const domainKnownAttributes = [
        AttributeObservableEntity.RelatedThreatCategory,
        AttributeObservableEntity.IsIoC,
        AttributeObservableEntity.IsTrusted,
        AttributeObservableEntity.IsDGA,
        AttributeObservableEntity.IsDelegated,
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
    return {
        domainKnownAttributes,
        domainModel: EntityFullInfoModel.createFromRawData(domainAggragate, []),
        fileModel: EntityFullInfoModel.createFromRawData(fileAggragate, [])
    };
};

test.run();
