import { ChromeManagementAdapter, ChromeRuntimeAdapter } from '../adapters';
import { TabCommunicationService } from '../services';
import { CheckEnabledStatusRequestMessage, OpenExtensionSettingsRequestMessage } from '../types';

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

        this.listeners.push(
            this.tabCommunicationService.listenTabRequest<
                CheckEnabledStatusRequestMessage['name'],
                CheckEnabledStatusRequestMessage['payload'],
                boolean
            >('CheckEnabledStatus', this.handleCheckEnabledStatusRequest.bind(this))
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

    private handleCheckEnabledStatusRequest(): Promise<boolean> {
        return ChromeManagementAdapter.getExtensionInfo()
            .then((info) => info?.enabled || false)
            .catch(() => false);
    }
}
