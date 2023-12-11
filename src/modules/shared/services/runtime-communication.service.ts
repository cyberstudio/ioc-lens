import { RuntimeResponseMessage, createRuntimeCancelRequestMessage, createRuntimeRequestMessage } from '../types';
import { ChromeRuntimeAdapter } from '../adapters';

export class RuntimeCommunicationService {
    sendRequest<Name extends string, RequestPayload, ResponsePayload>(
        name: Name,
        payload: RequestPayload,
        signal?: AbortSignal
    ): Promise<ResponsePayload> {
        let unsubscribeFromResponse: () => void;

        const message = createRuntimeRequestMessage(name, payload);

        if (signal) {
            signal.addEventListener(
                'abort',
                () => {
                    unsubscribeFromResponse();

                    const cancelMessage = createRuntimeCancelRequestMessage(message.requestId);

                    ChromeRuntimeAdapter.sendMessage(cancelMessage);
                },
                { once: true }
            );
        }

        ChromeRuntimeAdapter.sendMessage(message);

        const isResponse = (m: RuntimeResponseMessage<unknown>): m is RuntimeResponseMessage<ResponsePayload> => {
            return m.type === 'RuntimeResponse' && m.requestId === message.requestId;
        };

        return new Promise((res) => {
            unsubscribeFromResponse = ChromeRuntimeAdapter.listenMessage<RuntimeResponseMessage<ResponsePayload>>(
                isResponse,
                (m) => res(m.payload)
            );
        });
    }
}
