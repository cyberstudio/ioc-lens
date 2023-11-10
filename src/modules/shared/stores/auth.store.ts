import { ChromeStorageAdapter } from '../adapters';

type AuthIdleState = { state: 'Idle' };
type AuthSuccessState = { state: 'Success'; token: string };
type AuthFailureState = { state: 'Failure'; error: 'Unauthorized' | 'Forbidden' | 'Unknown' };

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

    async toSuccessState(token: string) {
        await ChromeStorageAdapter.set<AuthStoreState>(namespace, { state: 'Success', token });
    }

    async toUnauthorizedState() {
        await ChromeStorageAdapter.set<AuthStoreState>(namespace, { state: 'Failure', error: 'Unauthorized' });
    }

    async toForbiddenState() {
        await ChromeStorageAdapter.set<AuthStoreState>(namespace, { state: 'Failure', error: 'Forbidden' });
    }

    async toFailureState() {
        await ChromeStorageAdapter.set<AuthStoreState>(namespace, { state: 'Failure', error: 'Unknown' });
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
