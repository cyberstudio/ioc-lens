import { RuntimeMessage } from '../types';

export class ChromeTabsAdapter {
    static async getCurrentTab() {
        return chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => tabs[0]);
    }

    static sendMessage<M extends RuntimeMessage<string, unknown>>(tabId: number, message: M) {
        chrome.tabs.sendMessage(tabId, message).catch((e) => console.warn('Tabs send message error', e));
    }

    static onActivated(cb: () => void) {
        chrome.tabs.onActivated.addListener(() => cb());
    }

    static onUpdated(cb: () => void) {
        chrome.tabs.onUpdated.addListener(() => cb());
    }
}
