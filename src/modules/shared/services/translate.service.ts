import MessageFormat from 'messageformat';

import { ChromeI18nAdapter } from '../adapters';

export class TranslateService {
    private mf: MessageFormat;

    get currentLocale(): string {
        return ChromeI18nAdapter.getCurrentLocale();
    }

    constructor() {
        this.mf = new MessageFormat(this.currentLocale);
    }

    translate(key: string, params?: object): string {
        const message = ChromeI18nAdapter.translate(key);

        if (message.length === 0) {
            return key;
        }

        return this.mf.compile(message)(params || {});
    }

    translateNumber(value: number): string {
        return value.toLocaleString(this.currentLocale);
    }
}
