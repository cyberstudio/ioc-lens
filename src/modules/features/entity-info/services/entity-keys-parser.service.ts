import { BaseEntityKeyType, FileKeyType, ObservableEntityType } from '../../../api/models';
import uniqBy from 'lodash/uniqBy';

const md5HashPattern = /\b[a-f0-9]{32}\b/gi;
const sha1HashPattern = /\b[a-f0-9]{40}\b/gi;
const sha256HashPattern = /\b[a-f0-9]{64}\b/gi;
const ipAddressPattern =
    /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(((([0-9A-Fa-f]{1,4}\[?:\]?){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?))/gi;
const emailAddressPattern =
    // eslint-disable-next-line no-control-regex
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;
const domainNamePattern = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\[?\.\]?)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/gi;
const urlPattern =
    /\b((?:[a-z][\w-]+\[?:\]?(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()[\]{};:'".,<>?«»“”‘’])|;)+/gi;

const PATTERNS = [
    md5HashPattern,
    sha1HashPattern,
    sha256HashPattern,
    ipAddressPattern,
    emailAddressPattern,
    domainNamePattern,
    urlPattern
];

export interface ParsingResult {
    type: ObservableEntityType;
    keyType: BaseEntityKeyType | FileKeyType;
    keyValue: string;
}

export class EntityKeysParserService {
    parse(text: string): ParsingResult[] {
        const results: ParsingResult[] = [];

        for (const pattern of PATTERNS) {
            const values = text.match(pattern);

            let result: ParsingResult = {
                type: ObservableEntityType.DomainName,
                keyType: 'String',
                keyValue: ''
            };

            switch (pattern.source) {
                case md5HashPattern.source:
                    result = {
                        ...result,
                        type: ObservableEntityType.File,
                        keyType: 'MD5Hash'
                    };
                    break;
                case sha1HashPattern.source:
                    result = {
                        ...result,
                        type: ObservableEntityType.File,
                        keyType: 'SHA1Hash'
                    };
                    break;
                case sha256HashPattern.source:
                    result = {
                        ...result,
                        type: ObservableEntityType.File,
                        keyType: 'SHA256Hash'
                    };
                    break;
                case ipAddressPattern.source:
                    result = {
                        ...result,
                        type: ObservableEntityType.IPAddress
                    };
                    break;
                case emailAddressPattern.source:
                    result = {
                        ...result,
                        type: ObservableEntityType.EmailAddress
                    };
                    break;
                case urlPattern.source:
                    result = {
                        ...result,
                        type: ObservableEntityType.URL
                    };
                    break;
                default:
                    break;
            }

            if (values) {
                values.forEach((value) => {
                    results.push({
                        ...result,
                        keyValue: this.normalizeValue(value)
                    });
                });
            }
        }

        return uniqBy(results, 'keyValue');
    }

    private normalizeValue(text: string): string {
        const replacements: { [key: string]: string } = {
            hxxp: 'http',
            hxxps: 'https',
            '[.]': '.',
            '[:]': ':'
        };

        let newText = text;

        for (const value in replacements) {
            if (newText.includes(value)) {
                newText = newText.replace(value, replacements[value]);
            }
        }

        return newText;
    }
}
