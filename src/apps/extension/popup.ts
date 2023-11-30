import { AuthApiService } from '../../modules/api/services';
import { AuthService } from '../../modules/features/auth/services/auth.service';
import { WelcomePresenter } from '../../modules/features/welcome';
import { ActiveTabService, ApiService, TranslateService } from '../../modules/shared/services';
import { AuthStore, SettingsStore } from '../../modules/shared/stores';

import './styles/popup.css';

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
    const activeTabService = new ActiveTabService();

    // eslint-disable-next-line prettier/prettier
    new WelcomePresenter(
        window,
        root,
        settingsStore,
        authService,
        translateService,
        activeTabService
    );
}

main();
