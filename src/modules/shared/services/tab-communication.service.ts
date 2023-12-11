import isNil from 'lodash/isNil';

import { RuntimeCancelRequestMessage, RuntimeRequestMessage, createRuntimeResponseMessage } from '../types';
import { ChromeRuntimeAdapter, ChromeTabsAdapter } from '../adapters';
import { ActiveTabService } from './active-tab.service';

export class TabCommunicationService {
    constructor(private activeTabService: ActiveTabService) {}

    listenTabRequest<Name extends string, RequestPayload, ResponsePayload>(
        name: Name,
        cb: (payload: RequestPayload, signal: AbortSignal) => Promise<ResponsePayload>
    ) {
        const listeners = new Set<() => void>();

        const unsubscribe = () => listeners.forEach((u) => u());

        const isRequest = (
            m: RuntimeRequestMessage<unknown, unknown>
        ): m is RuntimeRequestMessage<Name, RequestPayload> => {
            return m.type === 'RuntimeRequest' && m.name === name;
        };

        const requestListener = ChromeRuntimeAdapter.listenMessage<RuntimeRequestMessage<Name, RequestPayload>>(
            isRequest,
            async (m) => {
                const { requestId, name } = m;

                const tabId = await this.activeTabService.getId();

                if (isNil(tabId)) {
                    console.warn('Unknown tab id for request name:', name);

                    return;
                }

                const abortController = new AbortController();

                const isCancelRequest = (m: RuntimeCancelRequestMessage): m is RuntimeCancelRequestMessage => {
                    return m.type === 'CancelRuntimeRequest' && m.requestId === requestId;
                };

                const cancelRequestListener = ChromeRuntimeAdapter.listenMessage<RuntimeCancelRequestMessage>(
                    isCancelRequest,
                    () => {
                        cancelRequestListener();
                        listeners.delete(cancelRequestListener);

                        abortController.abort();
                    }
                );

                listeners.add(cancelRequestListener);

                cb(m.payload, abortController.signal).then((response) => {
                    cancelRequestListener();
                    listeners.delete(cancelRequestListener);

                    if (!abortController.signal.aborted) {
                        ChromeTabsAdapter.sendMessage(tabId, createRuntimeResponseMessage(requestId, response));
                    }
                });
            }
        );

        listeners.add(requestListener);

        return unsubscribe;
    }
}
