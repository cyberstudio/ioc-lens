import { ChromeTabsAdapter } from '../adapters';

export class ActiveTabService {
    async getHost() {
        const tab = await ChromeTabsAdapter.getCurrentTab();

        if (!tab || !tab.url) {
            return '';
        }

        return new URL(tab.url).host;
    }

    async getId() {
        const tab = await ChromeTabsAdapter.getCurrentTab();

        if (!tab) {
            return null;
        }

        return tab.id;
    }
}
