export class ChromeManagementAdapter {
    static getExtensionInfo() {
        return chrome.management.getSelf();
    }

    static onTurnOn(cb: () => void) {
        return chrome.management.onEnabled.addListener(cb);
    }
}
