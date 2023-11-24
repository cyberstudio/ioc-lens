import { CountryCode, CountryName, DictionaryItemBrief, StaticDictionaryId } from '../../../api/models';

export const formatDictionaryItem = (value: DictionaryItemBrief): string => {
    if (isCountryDictionaryItem(value)) {
        const countryCode = value.key;
        const countryName = getCountryName(value);

        return countryName ? `${countryCode} (${countryName})` : countryCode;
    }
    return value.key;
};

const isCountryDictionaryItem = (value: DictionaryItemBrief): boolean => {
    return value.dictionary.uuid === StaticDictionaryId.CountryCodes;
};

const getCountryName = (value: DictionaryItemBrief): string => {
    if (!isCountryDictionaryItem(value)) {
        return '';
    }

    return CountryName[value.key as CountryCode] || '';
};
