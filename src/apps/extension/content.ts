import { SettingsStore } from '../../modules/shared/stores';
import {
    EntityInfoClientService,
    EntityInfoPresenter,
    FindKeysPresenter,
    EntityKeysParserService,
    EntityNavigationService
} from '../../modules/features/entity-info';
import {
    ActiveTabClientService,
    RuntimeCommunicationService,
    ServiceWorkerActionsClientService,
    TranslateService
} from '../../modules/shared/services';

import './styles/content.css';

function main() {
    const translateService = new TranslateService();
    const settingsStore = new SettingsStore();
    const activeTabClientService = new ActiveTabClientService(window);
    const runtimeCommunicationService = new RuntimeCommunicationService();
    const serviceWorkerActionsClientService = new ServiceWorkerActionsClientService(runtimeCommunicationService);
    const entityInfoClientService = new EntityInfoClientService(runtimeCommunicationService);
    const entityKeysParserService = new EntityKeysParserService();
    const entityNavigationService = new EntityNavigationService(settingsStore);
    const entityInfoPresenter = new EntityInfoPresenter(
        document.body,
        translateService,
        entityNavigationService,
        serviceWorkerActionsClientService,
        entityInfoClientService
    );

    new FindKeysPresenter(window, settingsStore, activeTabClientService, entityKeysParserService, entityInfoPresenter);
}

main();
