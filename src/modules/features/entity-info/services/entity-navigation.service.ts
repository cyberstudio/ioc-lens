import { SettingsStore } from '../../../shared/stores';

export class EntityNavigationService {
    constructor(private settingsStore: SettingsStore) {}

    async getViewEntityUrl(entityId: string): Promise<string> {
        const dataSource = await this.settingsStore.getDataSource();

        return `${dataSource.host}/#/objects/view/${entityId}`;
    }
}
