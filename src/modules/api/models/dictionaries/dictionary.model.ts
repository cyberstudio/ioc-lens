import { ApiItemPreview } from '../api-item-preview.model';

export interface DictionaryBrief extends ApiItemPreview {
    name: string;
}

export enum StaticDictionaryId {
    Vulnerabilities = '73ddd45a-46ae-4103-a5c0-9dc82ec69178',
    Sectors = 'bfddb9cf-06b0-4078-b4c0-2fea9c47638a',
    MalwareClasses = '9c90f196-3df5-48bf-a2e5-473c9e898ac9',
    MalwareFamilies = '4d9c8a63-dc80-4a75-ba81-b094861a6de6',
    DomainNameStatuses = 'e9e82178-f824-41a8-b092-9856f5fd290f',
    IpAddressStatuses = 'ac412459-607a-4a3a-a51e-702c30afb38a',
    ThreatActors = 'b6ecdecb-d3f6-48d7-a683-8159eb7ec865',
    Campaigns = 'e5ced4c8-a10d-472e-9ea5-36348ec6026d',
    CountryCodes = '427425b5-5a50-420d-99d2-1fbadc4c0139',
    Platforms = '0e25fdce-49a2-41bd-aa5b-eece954d7fe9'
}

export interface DictionaryItemBrief extends ApiItemPreview {
    key: string;
    dictionary: DictionaryBrief;
}
