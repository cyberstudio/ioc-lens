import { ChromeStorageAdapter } from '../adapters';

type AuthIdleState = { state: 'Idle' };
type AuthSuccessState = { state: 'Success'; token: string };
type AuthFailureState = { state: 'Failure'; error: 'UnknownApiKey' | 'Forbidden' | 'UnknownSettings' | 'Unknown' };

export type AuthStoreState = AuthIdleState | AuthSuccessState | AuthFailureState;

const defaultState: AuthStoreState = { state: 'Idle' };

const namespace = 'auth';

export class AuthStore {
    async init() {
        return ChromeStorageAdapter.init<AuthStoreState>(namespace, defaultState);
    }

    async getState() {
        return ChromeStorageAdapter.get<AuthStoreState>(namespace);
    }

    async rollbackState(state: AuthStoreState) {
        await ChromeStorageAdapter.set<AuthStoreState>(namespace, state, true);
    }

    async toIdleState() {
        await ChromeStorageAdapter.set<AuthStoreState>(namespace, { state: 'Idle' }, true);
    }

    async toSuccessState(token: string) {
        await ChromeStorageAdapter.set<AuthStoreState>(namespace, { state: 'Success', token }, true);
    }

    async toUnknownApiKeyState() {
        await ChromeStorageAdapter.set<AuthStoreState>(namespace, { state: 'Failure', error: 'UnknownApiKey' }, true);
    }

    async toForbiddenState() {
        await ChromeStorageAdapter.set<AuthStoreState>(namespace, { state: 'Failure', error: 'Forbidden' }, true);
    }

    async toUnknownSettingsState() {
        await ChromeStorageAdapter.set<AuthStoreState>(namespace, { state: 'Failure', error: 'UnknownSettings' }, true);
    }

    async toFailureState() {
        await ChromeStorageAdapter.set<AuthStoreState>(namespace, { state: 'Failure', error: 'Unknown' }, true);
    }

    onChangeState(cb: (state: AuthStoreState) => void) {
        return ChromeStorageAdapter.onChange<AuthStoreState>(namespace, () => {
            this.getState().then(cb);
        });
    }
}

export const isSuccessAuthState = (storeState: AuthStoreState): storeState is AuthSuccessState =>
    storeState.state === 'Success';

export const isFailureAuthState = (storeState: AuthStoreState): storeState is AuthFailureState =>
    storeState.state === 'Failure';
