import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { EntityFullInfoModel } from '../../models';
import { EntityMetadataMapper } from '../entity-metadata.mapper';
import { EntityMetadata, FileMetadata } from '../../models/entity-metadata.model';
import { DomainNameAggregateData, FileAggregateData } from '../../mocks';
import { HashSumType } from '../hash-sum.mapper';
import { isKnownAttribute } from '../../../../api/models';

test('should move unknown attributes to the end of the list', async () => {
    const environment = prepareEnvironment();

    const entity = EntityMetadataMapper.fromModel(environment.domainModel) as EntityMetadata;
    const lastAttributeIndex = entity.attributes.length - 1;
    const lastAttributeName = entity.attributes[lastAttributeIndex].attributeName;
    const isKnownLastAttribute = isKnownAttribute(lastAttributeName);

    assert.equal(isKnownLastAttribute, false);
});

test('should add hash sums for files', async () => {
    const environment = prepareEnvironment();
    const entity = EntityMetadataMapper.fromModel(environment.fileModel) as FileMetadata;

    assert.equal(entity.hashSums, [
        {
            type: HashSumType.MD5,
            value: 'c4ca4238a0b923820dcc509a6f75849b'
        },
        {
            type: HashSumType.SHA1,
            value: '356a192b7913b04c54574d18c28d46e6395428ab'
        },
        {
            type: HashSumType.SHA256,
            value: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b'
        }
    ]);
});

const prepareEnvironment = () => {
    const aggregate = DomainNameAggregateData.fill;
    const fileAggregate = FileAggregateData.fill;

    return {
        aggregate,
        domainModel: EntityFullInfoModel.createFromRawData(aggregate, []),
        fileModel: EntityFullInfoModel.createFromRawData(fileAggregate, [])
    };
};

test.run();
