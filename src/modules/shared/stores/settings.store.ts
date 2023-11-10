import isNil from 'lodash/isNil';
import { ChromeStorageAdapter } from '../adapters';
import { EmptyObject } from '../types';

export interface SettingsStoreState extends EmptyObject {
    activations: Record<string, boolean>;
    dataSourceHost: string | null;
    dataSourceApiKey: string | null;
}

const defaultState: SettingsStoreState = {
    activations: {},
    dataSourceHost: null,
    dataSourceApiKey: null
};

const namespace = 'settings';

export class SettingsStore {
    async init() {
        return ChromeStorageAdapter.init<SettingsStoreState>(namespace, defaultState);
    }

    async isActivated(host: string) {
        const { activations } = await ChromeStorageAdapter.get<SettingsStoreState>(namespace);

        return activations[host] || false;
    }

    async getDataSource() {
        const { dataSourceHost, dataSourceApiKey } = await ChromeStorageAdapter.get<SettingsStoreState>(namespace);

        return { host: dataSourceHost, apiKey: dataSourceApiKey };
    }

    async activate(host: string) {
        return this.toggleActivationState(host, true);
    }

    async deactivate(host: string) {
        return this.toggleActivationState(host, false);
    }

    async updateDataSource(host: string, apiKey: string) {
        return ChromeStorageAdapter.set<SettingsStoreState>(namespace, {
            dataSourceHost: host,
            dataSourceApiKey: apiKey
        });
    }

    onActivationChange(host: string, cb: (isActivated: boolean) => void) {
        return ChromeStorageAdapter.onChange<SettingsStoreState>(namespace, (changes) => {
            const isActivated = changes.activations?.[host];

            if (isNil(isActivated)) {
                return;
            }

            return cb(isActivated);
        });
    }

    private async toggleActivationState(host: string, value: boolean) {
        const { activations } = await ChromeStorageAdapter.get<SettingsStoreState>(namespace);

        activations[host] = value;

        return ChromeStorageAdapter.set<SettingsStoreState>(namespace, { activations });
    }
}
