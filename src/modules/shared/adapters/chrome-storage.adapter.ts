import isEqual from 'lodash/isEqual';
import isNil from 'lodash/isNil';
import pickBy from 'lodash/pickBy';

type EmptyObject = Record<string, unknown>;

export class ChromeStorageAdapter {
    static async init<Data extends EmptyObject>(namespace: string, defaultData: Data): Promise<void> {
        const currentData = await ChromeStorageAdapter.getNamespaceData(namespace);

        return ChromeStorageAdapter.set(namespace, { ...defaultData, ...currentData });
    }

    static async get<Data extends EmptyObject>(namespace: string): Promise<Data> {
        return (await ChromeStorageAdapter.getNamespaceData(namespace)) as Data;
    }

    static async set<Data extends EmptyObject>(namespace: string, data: Partial<Data>): Promise<void> {
        const currentData = await ChromeStorageAdapter.getNamespaceData(namespace);

        return chrome.storage.local.set({ [namespace]: { ...currentData, ...data } });
    }

    static onChange<Data extends EmptyObject>(namespace: string, cb: (changes: Partial<Data>) => void): () => void {
        const listener = (storageChanges: { [key: string]: chrome.storage.StorageChange }) => {
            const namespaceChanges = storageChanges[namespace];

            const hasChanges =
                !isNil(namespaceChanges) && !isNil(namespaceChanges.newValue) && !isNil(namespaceChanges.oldValue);

            if (!hasChanges) {
                return;
            }

            const changes = pickBy(
                namespaceChanges.newValue,
                (newValue, k) => !isEqual(newValue, namespaceChanges.oldValue?.[k])
            ) as Partial<Data>;

            cb(changes);
        };

        chrome.storage.local.onChanged.addListener(listener);

        return () => chrome.storage.local.onChanged.removeListener(listener);
    }

    private static async getNamespaceData<Data extends EmptyObject>(namespace: string): Promise<Data> {
        const data = await chrome.storage.local.get(namespace);

        return data[namespace];
    }
}
