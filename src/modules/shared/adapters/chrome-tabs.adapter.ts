export class ChromeTabsAdapter {
    static async getCurrentTab() {
        return chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => tabs[0]);
    }

    static onActivated(cb: () => void) {
        chrome.tabs.onActivated.addListener(() => cb());
    }

    static onUpdated(cb: () => void) {
        chrome.tabs.onUpdated.addListener(() => cb());
    }
}
