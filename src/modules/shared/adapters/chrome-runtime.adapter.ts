export class ChromeRuntimeAdapter {
    static onInstalled(cb: (t: chrome.runtime.InstalledDetails) => void) {
        chrome.runtime.onInstalled.addListener(cb);
    }

    static openOptions() {
        chrome.runtime.openOptionsPage();
    }
}
