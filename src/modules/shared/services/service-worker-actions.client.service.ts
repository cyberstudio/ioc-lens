import { CheckEnabledStatusRequestMessage, OpenExtensionSettingsRequestMessage } from '../types';
import { RuntimeCommunicationService } from './runtime-communication.service';

export class ServiceWorkerActionsClientService {
    constructor(private r: RuntimeCommunicationService) {}

    openExtensionSettings() {
        return this.r.sendRequest<OpenExtensionSettingsRequestMessage['name'], void, void>(
            'OpenExtensionSettings',
            undefined
        );
    }

    checkEnabledStatus() {
        return this.r.sendRequest<CheckEnabledStatusRequestMessage['name'], void, boolean>(
            'CheckEnabledStatus',
            undefined
        );
    }

    pollEnabledStatus(cb: (status: boolean) => void) {
        const intervalId = setInterval(async () => {
            let isEnabled: boolean;

            try {
                isEnabled = await this.checkEnabledStatus();
            } catch {
                isEnabled = false;
            }

            cb(isEnabled);
        }, 300);

        return () => clearInterval(intervalId);
    }
}
