import { AttributeObservableEntity, AttributeValueType, ObservableEntityType } from '../../../api/models';
import { HashSum } from '../mappers';

/* eslint-disable @typescript-eslint/naming-convention */
export type EntityMetadata =
    | FileMetadata
    | IpAddressMetadata
    | DomainNameMetadata
    | UrlMetadata
    | EmailAddressMetadata
    | PhoneNumberMetadata;

export type FileMetadata = BaseEntityMetadata<ObservableEntityType.File> & {
    hashSums: HashSum[];
};

export type IpAddressMetadata = BaseEntityMetadata<ObservableEntityType.IPAddress>;

export type DomainNameMetadata = BaseEntityMetadata<ObservableEntityType.DomainName>;

export type UrlMetadata = BaseEntityMetadata<ObservableEntityType.URL>;

export type EmailAddressMetadata = BaseEntityMetadata<ObservableEntityType.EmailAddress>;

export type PhoneNumberMetadata = BaseEntityMetadata<ObservableEntityType.PhoneNumber>;

interface BaseEntityMetadata<Type extends ObservableEntityType> {
    id: string;
    type: Type;
    priorityKey: string;
    verdictAttributes: EntityAttributeValuesProps[];
    attributes: EntityAttributeValuesProps[];
    labels: string[];
    relatedEntitiesAmount: number;
}

export interface EntityAttributeValuesProps<A extends AttributeObservableEntity | string = AttributeObservableEntity> {
    attributeName: A | string;
    values: {
        value: AttributeValueType<A>;
        confidence: number | null;
    }[];
}
