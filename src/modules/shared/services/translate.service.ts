import IntlMessageFormat from 'intl-messageformat';

import { ChromeI18nAdapter } from '../adapters';

export class TranslateService {
    get currentLocale(): string {
        return ChromeI18nAdapter.getCurrentLocale();
    }

    translate(key: string, params?: Record<string, string | number | boolean>): string {
        const message = ChromeI18nAdapter.translate(key);

        if (message.length === 0) {
            return key;
        }

        return new IntlMessageFormat(message, ChromeI18nAdapter.getCurrentLocale()).format(params || {}) as string;
    }

    translateNumber(value: number): string {
        return value.toLocaleString(this.currentLocale);
    }
}
