import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { stub } from 'sinon';

import { AuthApiService } from '../../../../api/services';
import { ApiService } from '../../../../shared/services';
import { SettingsStore, AuthStore } from '../../../../shared/stores';
import { AuthService } from '../auth.service';
import { mockChromeStorageAdapter } from '../../../../shared/mocks';
import { ShareLevel } from '../../../../api/models';

const stubFetch = stub(global, 'fetch');

test('should move auth state to UnknownSettings error if settings is empty', async () => {
    const environment = prepareEnvironment();

    await environment.settingsStore.init();
    await environment.authStore.init();

    const abortController = new AbortController();

    await environment.authService.auth(abortController.signal);

    const resultState = await environment.authService.getState();

    assert.equal(resultState, { state: 'Failure', error: 'UnknownSettings' });
});

test('should move auth state to Forbidden error for user without permissions', async () => {
    const environment = await prepareSuite({
        getAccessTokenResponse: {
            status: 200,
            body: {
                accessToken: 'accessToken',
                tokenType: 'Bearer',
                expiresIn: 1
            }
        },
        getUserInfoResponse: {
            status: 200,
            body: {
                uuid: '',
                login: '',
                fullName: '',
                email: '',
                isDisabled: false,
                authProviderID: '',
                dataSource: null,
                accessLevel: ShareLevel.Amber,
                permissions: [],
                roles: [],
                passwordAuthEnabled: true
            }
        }
    });

    const abortController = new AbortController();

    await environment.authService.auth(abortController.signal);

    const resultState = await environment.authService.getState();

    assert.equal(resultState, { state: 'Failure', error: 'Forbidden' });
});

test('should move auth state to Forbidden error when request user returns unknown error', async () => {
    const environment = await prepareSuite({
        getAccessTokenResponse: {
            status: 200,
            body: {
                accessToken: 'accessToken',
                tokenType: 'Bearer',
                expiresIn: 1
            }
        },
        getUserInfoResponse: {
            status: 500,
            body: null
        }
    });

    const abortController = new AbortController();

    await environment.authService.auth(abortController.signal);

    const resultState = await environment.authService.getState();

    assert.equal(resultState, { state: 'Failure', error: 'Forbidden' });
});

test('should move auth state to UnknownApiKey error when request token returns forbidden error', async () => {
    const environment = await prepareSuite({
        getAccessTokenResponse: {
            status: 403,
            body: null
        },
        getUserInfoResponse: {
            status: 500,
            body: null
        }
    });

    const abortController = new AbortController();

    await environment.authService.auth(abortController.signal);

    const resultState = await environment.authService.getState();

    assert.equal(resultState, { state: 'Failure', error: 'UnknownApiKey' });
});

test('should move auth state to UnknownApiKey error when request token returns unauthorized error', async () => {
    const environment = await prepareSuite({
        getAccessTokenResponse: {
            status: 401,
            body: null
        },
        getUserInfoResponse: {
            status: 500,
            body: null
        }
    });

    const abortController = new AbortController();

    await environment.authService.auth(abortController.signal);

    const resultState = await environment.authService.getState();

    assert.equal(resultState, { state: 'Failure', error: 'UnknownApiKey' });
});

test('should move auth state to Success for user with permissions', async () => {
    const environment = await prepareSuite({
        getAccessTokenResponse: {
            status: 200,
            body: {
                accessToken: 'accessToken',
                tokenType: 'Bearer',
                expiresIn: 1
            }
        },
        getUserInfoResponse: {
            status: 200,
            body: {
                uuid: '',
                login: '',
                fullName: '',
                email: '',
                isDisabled: false,
                authProviderID: '',
                dataSource: null,
                accessLevel: ShareLevel.Amber,
                permissions: ['Observable:rw'],
                roles: [],
                passwordAuthEnabled: true
            }
        }
    });

    const abortController = new AbortController();

    await environment.authService.auth(abortController.signal);

    const resultState = await environment.authService.getState();

    assert.equal(resultState, { state: 'Success', token: 'accessToken' });
});

test.after.each(() => {
    stubFetch.reset();
});

const prepareEnvironment = () => {
    mockChromeStorageAdapter();

    const settingsStore = new SettingsStore();
    const authStore = new AuthStore();
    const apiService = new ApiService(settingsStore, authStore);
    const authApiService = new AuthApiService(apiService);
    const authService = new AuthService(authApiService, settingsStore, authStore);

    return {
        settingsStore,
        authStore,
        apiService,
        authApiService,
        authService
    };
};

const prepareSuite = async (params: {
    getAccessTokenResponse: {
        status: number;
        body: unknown;
    };

    getUserInfoResponse: {
        status: number;
        body: unknown;
    };
}) => {
    const { getAccessTokenResponse, getUserInfoResponse } = params;

    const env = prepareEnvironment();

    await env.settingsStore.init();
    await env.authStore.init();

    await env.settingsStore.updateDataSource('https://host.com', 'apiKey');

    stubFetch.callsFake((url) => {
        switch (url) {
            case 'https://host.com/auth/token?apiKey=apiKey': {
                return Promise.resolve(
                    new global.Response(JSON.stringify(getAccessTokenResponse.body), {
                        status: getAccessTokenResponse.status
                    })
                );
            }

            case 'https://host.com/users/me': {
                return Promise.resolve(
                    new global.Response(JSON.stringify(getUserInfoResponse.body), {
                        status: getUserInfoResponse.status
                    })
                );
            }

            default: {
                return Promise.resolve(new global.Response(JSON.stringify(null), { status: 500 }));
            }
        }
    });

    return env;
};

test.run();
