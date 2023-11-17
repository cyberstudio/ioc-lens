import { ChromeI18nAdapter } from '../adapters';

import en from '../resources/_locales/en/messages.json';
import ru from '../resources/_locales/ru/messages.json';

export const mockChromeI18nAdapter = (currentLocale: string = 'ru') => {
    ChromeI18nAdapter.getCurrentLocale = () => currentLocale;

    ChromeI18nAdapter.translate = (key: string): string => {
        switch (currentLocale) {
            case 'ru': {
                return ru[key as keyof typeof ru].message;
            }

            case 'en': {
                return en[key as keyof typeof en].message;
            }

            default: {
                return '';
            }
        }
    };
};
