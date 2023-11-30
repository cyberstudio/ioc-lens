import { AuthApiService } from '../../modules/api/services';
import { AuthService } from '../../modules/features/auth/services/auth.service';
import { SettingsPresenter } from '../../modules/features/settings';
import { ApiService, TranslateService } from '../../modules/shared/services';
import { AuthStore, SettingsStore } from '../../modules/shared/stores';

import './styles/options.css';

function main() {
    const root = document.querySelector<HTMLElement>('#root');

    if (root === null) {
        return;
    }

    const settingsStore = new SettingsStore();
    const authStore = new AuthStore();
    const apiService = new ApiService(settingsStore, authStore);
    const authApiService = new AuthApiService(apiService);
    const authService = new AuthService(authApiService, settingsStore, authStore);
    const translateService = new TranslateService();

    new SettingsPresenter(window, root, settingsStore, authService, translateService);
}

main();
