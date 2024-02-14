import { SettingsStore } from '../../modules/shared/stores';
import {
    EntityInfoClientService,
    EntityInfoPresenter,
    FindKeysPresenter,
    EntityKeysParserService,
    EntityNavigationService
} from '../../modules/features/entity-info';
import { destroyKbqTitle } from '../../modules/shared/directives';
import {
    RuntimeCommunicationService,
    ServiceWorkerActionsClientService,
    TranslateService
} from '../../modules/shared/services';

import './styles/content.css';

function main() {
    const root = document.body;

    const translateService = new TranslateService();
    const settingsStore = new SettingsStore();
    const runtimeCommunicationService = new RuntimeCommunicationService();
    const serviceWorkerActionsClientService = new ServiceWorkerActionsClientService(runtimeCommunicationService);
    const entityInfoClientService = new EntityInfoClientService(runtimeCommunicationService);
    const entityKeysParserService = new EntityKeysParserService();
    const entityNavigationService = new EntityNavigationService(settingsStore);
    const entityInfoPresenter = new EntityInfoPresenter(
        root,
        translateService,
        entityNavigationService,
        serviceWorkerActionsClientService,
        entityInfoClientService
    );

    const findKeysPresenter = new FindKeysPresenter(
        window,
        settingsStore,
        entityKeysParserService,
        entityInfoPresenter
    );

    const unsubscribePollingExtensionStatus = serviceWorkerActionsClientService.pollEnabledStatus((isEnabled) => {
        if (!isEnabled) {
            findKeysPresenter.destroy();
            entityInfoPresenter.destroy();

            destroyKbqTitle();

            unsubscribePollingExtensionStatus();
        }
    });
}

main();
