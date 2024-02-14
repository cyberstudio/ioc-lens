import isNil from 'lodash/isNil';
import { ChromeStorageAdapter } from '../adapters';
import { EmptyObject } from '../types';

export interface SettingsStoreState extends EmptyObject {
    isActivated: boolean;
    dataSourceHost: string | null;
    dataSourceApiKey: string | null;
}

const defaultState: SettingsStoreState = {
    isActivated: false,
    dataSourceHost: null,
    dataSourceApiKey: null
};

const namespace = 'settings';

export class SettingsStore {
    async init() {
        return ChromeStorageAdapter.init<SettingsStoreState>(namespace, defaultState);
    }

    async isActivated() {
        const { isActivated } = await ChromeStorageAdapter.get<SettingsStoreState>(namespace);

        return isActivated || false;
    }

    async getDataSource() {
        const { dataSourceHost, dataSourceApiKey } = await ChromeStorageAdapter.get<SettingsStoreState>(namespace);

        return { host: dataSourceHost, apiKey: dataSourceApiKey };
    }

    async activate() {
        return this.toggleActivationState(true);
    }

    async deactivate() {
        return this.toggleActivationState(false);
    }

    async updateDataSource(host: string, apiKey: string) {
        return ChromeStorageAdapter.set<SettingsStoreState>(namespace, {
            dataSourceHost: host,
            dataSourceApiKey: apiKey
        });
    }

    onActivationsChange(cb: () => void) {
        return ChromeStorageAdapter.onChange<SettingsStoreState>(namespace, (changes) => {
            if (isNil(changes.isActivated)) {
                return;
            }

            return cb();
        });
    }

    onActivationChange(cb: (isActivated: boolean) => void) {
        return ChromeStorageAdapter.onChange<SettingsStoreState>(namespace, (changes) => {
            const isActivated = changes.isActivated;

            if (isNil(isActivated)) {
                return;
            }

            return cb(isActivated);
        });
    }

    private async toggleActivationState(isActivated: boolean) {
        return ChromeStorageAdapter.set<SettingsStoreState>(namespace, { isActivated });
    }
}
