import { OpenExtensionSettingsRequestMessage } from '../types';
import { RuntimeCommunicationService } from './runtime-communication.service';

export class ServiceWorkerActionsClientService {
    constructor(private r: RuntimeCommunicationService) {}

    openExtensionSettings() {
        return this.r.sendRequest<OpenExtensionSettingsRequestMessage['name'], void, void>(
            'OpenExtensionSettings',
            undefined
        );
    }
}
