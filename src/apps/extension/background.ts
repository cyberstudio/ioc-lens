import { ChromeRuntimeAdapter, ChromeTabsAdapter } from '../../modules/shared/adapters';
import { ActiveTabService, StatusIconService } from '../../modules/shared/services';
import { SettingsStore } from '../../modules/shared/stores';

async function main() {
    const settingsStore = new SettingsStore();
    const activeTabService = new ActiveTabService();
    const statusIconService = new StatusIconService(activeTabService);

    ChromeRuntimeAdapter.onInstalled(async () => updateStatusIcon());
    ChromeTabsAdapter.onActivated(() => updateStatusIcon());
    ChromeTabsAdapter.onUpdated(() => updateStatusIcon());

    settingsStore.onActivationsChange(() => updateStatusIcon());

    const updateStatusIcon = async () => {
        const currentHost = await activeTabService.getHost();
        const currentActivationState = await settingsStore.isActivated(currentHost);

        statusIconService.updateIcon(currentActivationState);
    };
}

main();
