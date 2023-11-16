import { ObservableEntityType } from './oet.model';
import { NaturalAttributesSection } from './natural-attributes-section.model';
import { AssociatedAttributesSection } from './associated-attributes-section.model';
import { LabelsSection } from './labels-section.model';

export enum AggregateSectionName {
    Labels = 'Labels',
    NaturalAttributes = 'NaturalAttributes',
    AssociatedAttributes = 'AssociatedAttributes'
}

// prettier-ignore
export type AggregateSection<OET = ObservableEntityType> =
    OET extends ObservableEntityType.DomainName ? DomainNameAggregateSection :
    OET extends ObservableEntityType.IPAddress ? IpAddressAggregateSection :
    OET extends ObservableEntityType.EmailAddress ? EmailAddressAggregateSection :
    OET extends ObservableEntityType.URL ? UrlAggregateSection :
    OET extends ObservableEntityType.PhoneNumber ? PhoneNumberAggregateSection :
    OET extends ObservableEntityType.Identity ? IdentityAggregateSection :
    OET extends ObservableEntityType.File ? FileAggregateSection :
        | DomainNameAggregateSection
        | IpAddressAggregateSection
        | EmailAddressAggregateSection
        | UrlAggregateSection
        | PhoneNumberAggregateSection
        | IdentityAggregateSection
        | FileAggregateSection;

export interface BaseAggregateSection<SectionType extends AggregateSectionName, SectionData> {
    name: SectionType;
    data: SectionData;
}

export type DomainNameAggregateSection =
    | AssociatedAttributesSection<ObservableEntityType.DomainName>
    | NaturalAttributesSection<ObservableEntityType.DomainName>
    | LabelsSection;

export type IpAddressAggregateSection =
    | AssociatedAttributesSection<ObservableEntityType.IPAddress>
    | NaturalAttributesSection<ObservableEntityType.IPAddress>
    | LabelsSection;

export type EmailAddressAggregateSection =
    | AssociatedAttributesSection<ObservableEntityType.EmailAddress>
    | NaturalAttributesSection<ObservableEntityType.EmailAddress>
    | LabelsSection;

export type UrlAggregateSection =
    | AssociatedAttributesSection<ObservableEntityType.URL>
    | NaturalAttributesSection<ObservableEntityType.URL>
    | LabelsSection;

export type PhoneNumberAggregateSection = AssociatedAttributesSection<ObservableEntityType.PhoneNumber> | LabelsSection;

export type IdentityAggregateSection = NaturalAttributesSection<ObservableEntityType.Identity> | LabelsSection;

export type FileAggregateSection =
    | AssociatedAttributesSection<ObservableEntityType.File>
    | NaturalAttributesSection<ObservableEntityType.File>
    | LabelsSection;
