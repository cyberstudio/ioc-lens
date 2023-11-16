// prettier-ignore
import { ObservableEntityType } from "./oet.model";
import { ApiItemPreview } from '../api-item-preview.model';

export interface BaseObservableEntity<OET extends ObservableEntityType> extends ApiItemPreview {
    type: OET;
    keys: ObservableEntityKey<OET>[];
}

// prettier-ignore
export type ObservableEntityKey<OET = ObservableEntityType> =
        OET extends ObservableEntityType.DomainName ? BaseEntityKey :
        OET extends ObservableEntityType.IPAddress ? BaseEntityKey :
        OET extends ObservableEntityType.EmailAddress ? BaseEntityKey :
        OET extends ObservableEntityType.URL ? BaseEntityKey :
        OET extends ObservableEntityType.PhoneNumber ? BaseEntityKey :
        OET extends ObservableEntityType.Identity ? IdentityKey :
        OET extends ObservableEntityType.File ? FileKey :
            | BaseEntityKey
            | IdentityKey
            | FileKey;

export interface BaseEntityKey {
    type: BaseEntityKeyType;
    value: string;
}
export interface IdentityKey {
    type: IdentityKeyType;
    value: string;
}
export interface FileKey {
    type: FileKeyType;
    value: string;
}

export type BaseEntityKeyType = 'String';
export type IdentityKeyType = 'IANAID' | 'NICHandle';
export type FileKeyType = 'MD5Hash' | 'SHA1Hash' | 'SHA256Hash';

export type ObservableEntityKeyType = BaseEntityKeyType | IdentityKeyType | FileKeyType;
