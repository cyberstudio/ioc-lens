import { AuthApiService, EntitiesApiService } from '../../modules/api/services';
import { AuthService } from '../../modules/features/auth/services/auth.service';
import { EntityInfoController } from '../../modules/features/entity-info';
import { EntityInfoService } from '../../modules/features/entity-info/services';
import { ChromeManagementAdapter, ChromeRuntimeAdapter, ChromeTabsAdapter } from '../../modules/shared/adapters';
import { ServiceWorkerActionsController } from '../../modules/shared/controllers';
import {
    ActiveTabService,
    ApiService,
    StatusIconService,
    TabCommunicationService
} from '../../modules/shared/services';
import { AuthStore, SettingsStore } from '../../modules/shared/stores';

async function main() {
    const settingsStore = new SettingsStore();
    const authStore = new AuthStore();
    const activeTabService = new ActiveTabService();
    const statusIconService = new StatusIconService(activeTabService);
    const apiService = new ApiService(settingsStore, authStore);
    const authApiService = new AuthApiService(apiService);
    const entitiesApiService = new EntitiesApiService(apiService);
    const authService = new AuthService(authApiService, settingsStore, authStore);
    const entityInfoService = new EntityInfoService(entitiesApiService, authService);
    const tabCommunicationService = new TabCommunicationService(activeTabService);

    ChromeRuntimeAdapter.onInstalled(() => updateStatusIcon());
    ChromeTabsAdapter.onActivated(() => updateStatusIcon());
    ChromeTabsAdapter.onUpdated(() => updateStatusIcon());
    ChromeManagementAdapter.onTurnOn(() => updateStatusIcon());

    settingsStore.onActivationsChange(() => updateStatusIcon());

    const updateStatusIcon = async () => {
        const currentActivationState = await settingsStore.isActivated();

        statusIconService.updateIcon(currentActivationState);
    };

    new ServiceWorkerActionsController(tabCommunicationService);
    new EntityInfoController(tabCommunicationService, entityInfoService);
}

main();
