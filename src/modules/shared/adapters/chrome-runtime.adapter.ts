export class ChromeRuntimeAdapter {
    static onInstalled(cb: (t: chrome.runtime.InstalledDetails) => void) {
        chrome.runtime.onInstalled.addListener(cb);
    }

    static openOptions() {
        chrome.runtime.openOptionsPage();
    }

    static sendMessage<M extends { type: string }, R>(message: M): Promise<R> {
        return chrome.runtime.sendMessage(message);
    }

    static listenMessage<M extends { type: string }, R>(message: M, response: () => Promise<R>) {
        const cb = async (m: M, _: chrome.runtime.MessageSender, sendResponse: (resp?: unknown) => void) => {
            if (m.type === message.type) {
                response().then((result) => sendResponse(result));
            }
        };

        chrome.runtime.onMessage.addListener(cb);

        return () => chrome.runtime.onMessage.removeListener(cb);
    }
}
