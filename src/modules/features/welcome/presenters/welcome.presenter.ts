import { ChromeRuntimeAdapter } from '../../../shared/adapters';
import { ActiveTabService, TranslateService } from '../../../shared/services';
import { SettingsStore } from '../../../shared/stores';
import { renderComponent } from '../../../shared/utils';
import { AuthService } from '../../auth/services/auth.service';
import { WelcomeComponent } from '../components';

export class WelcomePresenter {
    private welcomeComponent: WelcomeComponent;

    private abortAuth: AbortController | undefined;

    constructor(
        private window: Window,
        private root: HTMLElement,
        private settingsStore: SettingsStore,
        private authService: AuthService,
        private translateService: TranslateService,
        private activeTabService: ActiveTabService
    ) {
        this.welcomeComponent = new WelcomeComponent(
            {
                activationState: false,
                authState: { state: 'Idle' },
                onChangeActivateState: (state) => this.handleActivationChange(state),
                onGoToSettings: () => this.handleGoToSettings(),
                onRefreshAuth: () => this.handleRefreshAuth()
            },
            this.translateService
        );

        this.init();
    }

    private async init() {
        const currentHost = await this.activeTabService.getHost();

        const [activationState, authState] = await Promise.all([
            this.settingsStore.isActivated(currentHost),
            this.authService.getState()
        ]);

        renderComponent(this.root, this.welcomeComponent);

        this.welcomeComponent.updateActivationState(activationState);
        this.welcomeComponent.updateAuthState(authState);

        this.authService.onChangeState((authState) => {
            this.welcomeComponent.updateAuthState(authState);
        });
    }

    private async handleActivationChange(state: boolean) {
        const currentHost = await this.activeTabService.getHost();

        this.welcomeComponent.updateActivationState(state);

        if (state) {
            await this.settingsStore.activate(currentHost);
            await this.auth();
        } else {
            await this.settingsStore.deactivate(currentHost);

            this.cancelAuth();
        }
    }

    private handleGoToSettings(): void {
        this.window.close();

        ChromeRuntimeAdapter.openOptions();
    }

    private handleRefreshAuth(): void {
        this.auth();
    }

    private async auth(): Promise<void> {
        this.cancelAuth();

        this.abortAuth = new AbortController();

        await this.authService.auth(this.abortAuth.signal);
    }

    private cancelAuth(): void {
        if (this.abortAuth) {
            this.abortAuth.abort();
        }
    }
}
