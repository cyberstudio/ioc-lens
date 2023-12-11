import { ChromeRuntimeAdapter } from '../adapters';
import { TabCommunicationService } from '../services';
import { OpenExtensionSettingsRequestMessage } from '../types';

export class ServiceWorkerActionsController {
    private listeners: (() => void)[] = [];

    constructor(private tabCommunicationService: TabCommunicationService) {
        this.listeners.push(
            this.tabCommunicationService.listenTabRequest<
                OpenExtensionSettingsRequestMessage['name'],
                OpenExtensionSettingsRequestMessage['payload'],
                void
            >('OpenExtensionSettings', this.handleOpenExtensionSettingsRequest.bind(this))
        );
    }

    destroy(): void {
        this.listeners.forEach((unsubscribe) => {
            unsubscribe();
        });
    }

    private handleOpenExtensionSettingsRequest(): Promise<void> {
        ChromeRuntimeAdapter.openOptions();

        return Promise.resolve();
    }
}
