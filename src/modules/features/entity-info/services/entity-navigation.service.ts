import { SettingsStore } from '../../../shared/stores';

export class EntityNavigationService {
    constructor(private settingsStore: SettingsStore) {}

    async getViewEntityUrl(entityId: string): Promise<string> {
        const dataSource = await this.settingsStore.getDataSource();

        const host = dataSource.host?.endsWith('/') ? dataSource.host.replace(/\/+$/, '') : dataSource.host;

        return `${host}/#/objects/view/${entityId}`.replace(/(?<=\w)\/\/+/g, '/');
    }
}
