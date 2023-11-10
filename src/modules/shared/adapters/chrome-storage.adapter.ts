import isNil from 'lodash/isNil';

import { DeepPartial, EmptyObject } from '../types';
import { getObjectDiff } from '../utils';

export class ChromeStorageAdapter {
    static async init<Data extends EmptyObject>(namespace: string, defaultData: Data): Promise<void> {
        const currentData = await ChromeStorageAdapter.getNamespaceData(namespace);

        return ChromeStorageAdapter.set(namespace, { ...defaultData, ...currentData });
    }

    static async get<Data extends EmptyObject>(namespace: string): Promise<Data> {
        return { ...(await ChromeStorageAdapter.getNamespaceData(namespace)) } as Data;
    }

    static async set<Data extends EmptyObject>(namespace: string, data: Partial<Data>): Promise<void> {
        const currentData = await ChromeStorageAdapter.getNamespaceData(namespace);

        return chrome.storage.local.set({ [namespace]: { ...currentData, ...data } });
    }

    static onChange<Data extends EmptyObject>(namespace: string, cb: (changes: DeepPartial<Data>) => void): () => void {
        const listener = (storageChanges: { [key: string]: chrome.storage.StorageChange }) => {
            const namespaceChanges = storageChanges[namespace];

            const hasChanges =
                !isNil(namespaceChanges) && !isNil(namespaceChanges.newValue) && !isNil(namespaceChanges.oldValue);

            if (!hasChanges) {
                return;
            }

            cb(getObjectDiff(namespaceChanges.newValue, namespaceChanges.oldValue) as DeepPartial<Data>);
        };

        chrome.storage.local.onChanged.addListener(listener);

        return () => chrome.storage.local.onChanged.removeListener(listener);
    }

    private static async getNamespaceData<Data extends EmptyObject>(namespace: string): Promise<Data> {
        const data = await chrome.storage.local.get(namespace);

        return data[namespace];
    }
}
