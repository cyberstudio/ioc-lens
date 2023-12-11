import { RuntimeMessage } from '../types';

export class ChromeRuntimeAdapter {
    static onInstalled(cb: (t: chrome.runtime.InstalledDetails) => void) {
        chrome.runtime.onInstalled.addListener(cb);
    }

    static openOptions() {
        chrome.runtime.openOptionsPage();
    }

    static sendMessage<M extends RuntimeMessage<string, unknown>, R = void>(message: M): Promise<R> {
        return chrome.runtime.sendMessage(message);
    }

    static listenMessage<M extends RuntimeMessage<string, unknown>>(
        isMathMessage: (message: M) => message is M,
        response: (message: M) => void
    ) {
        const cb = (m: M) => {
            if (isMathMessage(m)) {
                response(m);
            }
        };

        chrome.runtime.onMessage.addListener(cb);

        return () => chrome.runtime.onMessage.removeListener(cb);
    }
}
