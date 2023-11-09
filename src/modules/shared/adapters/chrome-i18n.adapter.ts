export class ChromeI18nAdapter {
    static getCurrentLocale(): string {
        return chrome.i18n.getUILanguage();
    }

    static translate(key: string, substitutions?: string | string[]): string {
        return chrome.i18n.getMessage(key, substitutions);
    }
}
