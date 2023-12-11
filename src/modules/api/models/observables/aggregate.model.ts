import { AggregateSectionName, AggregateSection } from './aggregate-section.model';
import { PaginationParams } from './pagination.model';
import { BaseObservableEntity, ObservableEntityKeyType } from './entity.model';
import { ObservableEntityType } from './oet.model';

// prettier-ignore
export type Aggregate<OET = ObservableEntityType> =
    OET extends ObservableEntityType.DomainName ? DomainNameAggregate :
    OET extends ObservableEntityType.IPAddress ? IpAddressAggregate :
    OET extends ObservableEntityType.EmailAddress ? EmailAddressAggregate :
    OET extends ObservableEntityType.URL ? UrlAggregate :
    OET extends ObservableEntityType.PhoneNumber ? PhoneNumberAggregate :
    OET extends ObservableEntityType.Identity ? IdentityAggregate :
    OET extends ObservableEntityType.File ? FileAggregate :
        | DomainNameAggregate
        | IpAddressAggregate
        | EmailAddressAggregate
        | UrlAggregate
        | PhoneNumberAggregate
        | IdentityAggregate
        | FileAggregate;

export type DomainNameAggregate = BaseAggregate<ObservableEntityType.DomainName>;
export type IpAddressAggregate = BaseAggregate<ObservableEntityType.IPAddress>;
export type EmailAddressAggregate = BaseAggregate<ObservableEntityType.EmailAddress>;
export type UrlAggregate = BaseAggregate<ObservableEntityType.URL>;
export type PhoneNumberAggregate = BaseAggregate<ObservableEntityType.PhoneNumber>;
export type IdentityAggregate = BaseAggregate<ObservableEntityType.Identity>;
export type FileAggregate = BaseAggregate<ObservableEntityType.File>;

export interface BaseAggregate<OET extends ObservableEntityType> extends BaseObservableEntity<OET> {
    sections: AggregateSection<OET>[];
}

export interface AggregatesRequestParams extends PaginationParams {
    section?: AggregateSectionName[];
    type?: ObservableEntityType;
    keyType?: ObservableEntityKeyType;
    key?: string;
}
