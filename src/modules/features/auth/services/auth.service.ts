import isNil from 'lodash/isNil';

import { AuthApiService } from '../../../api/services';
import { AuthStore, AuthStoreState, SettingsStore } from '../../../shared/stores';
import { AbortRequestError } from '../../../shared/utils';
import { ApiErrorCode } from '../../../shared/services';

export class AuthService {
    private requiredPermissions = ['Observable:r'];

    constructor(
        private authApi: AuthApiService,
        private settingStore: SettingsStore,
        private authStore: AuthStore
    ) {}

    async getState() {
        return this.authStore.getState();
    }

    async auth(signal: AbortSignal) {
        const currentState = await this.authStore.getState();

        await this.authStore.toIdleState();

        const { apiKey } = await this.settingStore.getDataSource();

        if (isNil(apiKey) || apiKey.length === 0) {
            await this.authStore.toUnknownSettingsState();

            return Promise.resolve();
        }

        const accessTokenResponse = await this.authApi.getAccessToken({ apiKey }, signal);

        if (accessTokenResponse.isOk) {
            await this.authStore.toSuccessState(accessTokenResponse.value.accessToken);

            const hasPermissions = await this.checkPermissions(signal);

            if (!hasPermissions) {
                await this.authStore.toForbiddenState();
            }

            return Promise.resolve();
        }

        if (accessTokenResponse.error instanceof AbortRequestError) {
            await this.authStore.rollbackState(currentState);

            return Promise.resolve();
        }

        switch (accessTokenResponse.error.name) {
            case ApiErrorCode.Forbidden:
            case ApiErrorCode.Unauthenticated: {
                await this.authStore.toUnknownApiKeyState();

                break;
            }

            case ApiErrorCode.UnknownHost: {
                await this.authStore.toUnknownSettingsState();

                break;
            }

            default: {
                await this.authStore.toFailureState();

                break;
            }
        }

        return Promise.resolve();
    }

    onChangeState(cb: (state: AuthStoreState) => void) {
        return this.authStore.onChangeState(cb);
    }

    private async checkPermissions(signal: AbortSignal) {
        const getUserResponse = await this.authApi.getUserInfo(signal);

        if (getUserResponse.isOk) {
            const user = getUserResponse.value;

            return Promise.resolve(
                this.requiredPermissions.every((requiredPermission) =>
                    user.permissions.some((userPermission) => userPermission.includes(requiredPermission))
                )
            );
        }

        return Promise.resolve(false);
    }
}
