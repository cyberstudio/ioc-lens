export class ChromeScriptingAdapter {
    static injectStyles(tabId: number, styles: string[]) {
        return chrome.scripting.insertCSS({ target: { tabId }, files: styles });
    }

    static injectScripts(tabId: number, scripts: string[]) {
        return chrome.scripting.executeScript({ target: { tabId }, files: scripts });
    }
}
