import { ChromeStorageAdapter } from '../adapters';
import { DeepPartial, EmptyObject } from '../types';

export const mockChromeStorageAdapter = () => {
    const storage: EmptyObject = {};

    const getNamespaceData = <Data>(ns: string): Promise<Data> => Promise.resolve(storage[ns] as Data);

    ChromeStorageAdapter.init = async <Data extends EmptyObject>(
        namespace: string,
        defaultData: Data
    ): Promise<void> => {
        const currentData = await getNamespaceData<Data>(namespace);

        return ChromeStorageAdapter.set(namespace, { ...defaultData, ...currentData }, true);
    };

    ChromeStorageAdapter.set = async <Data extends EmptyObject>(
        namespace: string,
        data: Partial<Data>,
        rewrite = false
    ): Promise<void> => {
        const currentData = await getNamespaceData<Data>(namespace);

        const nextData = rewrite ? data : { ...currentData, ...data };

        storage[namespace] = nextData;

        return Promise.resolve();
    };

    ChromeStorageAdapter.get = <Data extends EmptyObject>(namespace: string): Promise<Data> => {
        return getNamespaceData<Data>(namespace);
    };

    ChromeStorageAdapter.onChange =
        <Data extends EmptyObject>(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            namespace: string,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            cb: (changes: DeepPartial<Data>) => void
        ): (() => void) =>
        () => {};
};
