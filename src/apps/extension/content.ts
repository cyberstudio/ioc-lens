import { SettingsStore } from '../../modules/shared/stores';
import { EntityKeysParserService } from '../../modules/features/entity-info/services';
import { FindKeysPresenter } from '../../modules/features/entity-info';
import { ActiveTabClient } from '../../modules/shared/clients';

import './styles/content.css';

function main() {
    const settingsStore = new SettingsStore();
    const activeTabClient = new ActiveTabClient();
    const entityKeysParserService = new EntityKeysParserService();

    new FindKeysPresenter(window, settingsStore, activeTabClient, entityKeysParserService);
}

main();
