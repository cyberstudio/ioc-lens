import { ApiItemPreview } from '../api-item-preview.model';

export interface DictionaryBrief extends ApiItemPreview {
    name: string;
}

export interface DictionaryItemBrief extends ApiItemPreview {
    key: string;
    dictionary: DictionaryBrief;
}
