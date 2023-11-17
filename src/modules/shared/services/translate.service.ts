import MessageFormat from 'messageformat';

import { ChromeI18nAdapter } from '../adapters';

export class TranslateService {
    private mf: MessageFormat;

    constructor() {
        this.mf = new MessageFormat(ChromeI18nAdapter.getCurrentLocale());
    }

    translate(key: string, params?: object): string {
        const message = ChromeI18nAdapter.translate(key);

        if (message.length === 0) {
            return key;
        }

        return this.mf.compile(message)(params || {});
    }
}
