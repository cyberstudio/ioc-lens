import { FileKeyType } from '../../../api/models';

export enum HashSumType {
    MD5 = 'MD5',
    SHA1 = 'SHA1',
    SHA256 = 'SHA256'
}

export interface HashSum {
    type: HashSumType;
    value: string | null;
}

export class HashSumMapper {
    static fromFileKeyType(keyType: FileKeyType): HashSumType | null {
        switch (keyType) {
            case 'MD5Hash':
                return HashSumType.MD5;
            case 'SHA1Hash':
                return HashSumType.SHA1;
            case 'SHA256Hash':
                return HashSumType.SHA256;
            default:
                return null;
        }
    }

    static toFileKeyType(hashSumType: HashSumType): FileKeyType | null {
        switch (hashSumType) {
            case HashSumType.MD5:
                return 'MD5Hash';
            case HashSumType.SHA1:
                return 'SHA1Hash';
            case HashSumType.SHA256:
                return 'SHA256Hash';
            default:
                return null;
        }
    }
}
