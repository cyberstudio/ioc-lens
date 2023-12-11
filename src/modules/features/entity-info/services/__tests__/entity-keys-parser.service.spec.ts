import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { ObservableEntityType } from '../../../../api/models';
import { EntityKeysParserService } from '../entity-keys-parser.service';

test('should parse the string and get an array of observable entity types', () => {
    const text = `
        7815696ecbf1c96e6894b779456d330e,
        4A8A9FC31DC15A4B87BB145B05DB3AE0BF2333E4,
        18ee24150dcb1d96752a4d6dd0f20dfd8ba8c38527e40aa8509b7adecf78f9c6,
        192.1.2.3,
        192.1.2.34,
        2001:0db8:85a3:0000:0000:8a2e:0370:7334,
        test@t.com,
        hxxp://test.com:3000/,
        hxxps[:]//test123[.]com/
        https[:]//test123[.]com/
    `;

    const entityKeysParserService = new EntityKeysParserService();
    const result = entityKeysParserService.parse(text);

    assert.equal(result, [
        {
            type: ObservableEntityType.File,
            keyType: 'MD5Hash',
            keyValue: '7815696ecbf1c96e6894b779456d330e'
        },
        {
            type: ObservableEntityType.File,
            keyType: 'SHA1Hash',
            keyValue: '4A8A9FC31DC15A4B87BB145B05DB3AE0BF2333E4'
        },
        {
            type: ObservableEntityType.File,
            keyType: 'SHA256Hash',
            keyValue: '18ee24150dcb1d96752a4d6dd0f20dfd8ba8c38527e40aa8509b7adecf78f9c6'
        },
        {
            type: ObservableEntityType.IPAddress,
            keyType: 'String',
            keyValue: '192.1.2.3'
        },
        {
            type: ObservableEntityType.IPAddress,
            keyType: 'String',
            keyValue: '192.1.2.34'
        },
        {
            type: ObservableEntityType.IPAddress,
            keyType: 'String',
            keyValue: '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
        },
        {
            type: ObservableEntityType.EmailAddress,
            keyType: 'String',
            keyValue: 'test@t.com'
        },
        {
            type: ObservableEntityType.DomainName,
            keyType: 'String',
            keyValue: 't.com'
        },
        {
            type: ObservableEntityType.DomainName,
            keyType: 'String',
            keyValue: 'test.com'
        },
        {
            type: ObservableEntityType.DomainName,
            keyType: 'String',
            keyValue: 'test123.com'
        },
        {
            type: ObservableEntityType.URL,
            keyType: 'String',
            keyValue: 'http://test.com:3000/'
        },
        {
            type: ObservableEntityType.URL,
            keyType: 'String',
            keyValue: 'https://test123.com/'
        }
    ]);
});

test.run();
