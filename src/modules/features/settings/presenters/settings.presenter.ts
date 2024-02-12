import { TranslateService } from '../../../shared/services';
import { AuthStoreState, SettingsStore } from '../../../shared/stores';
import { renderComponent } from '../../../shared/utils';
import { AuthService } from '../../auth/services/auth.service';

import { SettingsFormComponent } from '../components';

export class SettingsPresenter {
    private formComponent: SettingsFormComponent;

    constructor(
        private window: Window,
        private root: HTMLElement,
        private settingsStore: SettingsStore,
        private authService: AuthService,
        private translateService: TranslateService
    ) {
        this.formComponent = new SettingsFormComponent(
            {
                state: { type: 'Idle' },
                data: {
                    host: '',
                    apiKey: ''
                },
                onSend: (data) => this.handleSendForm(data)
            },
            translateService
        );

        renderComponent(this.root, this.formComponent);

        this.settingsStore.getDataSource().then((data) => {
            this.formComponent.updateData(data);
        });
    }

    private async handleSendForm(data: { host: string; apiKey: string }) {
        const previousData = await this.settingsStore.getDataSource();
        const previousState = await this.authService.getState();

        this.formComponent.updateState({ type: 'Saving' });

        await this.settingsStore.updateDataSource(data.host, data.apiKey);

        const abortController = new AbortController();

        await this.authService.auth(abortController.signal);

        const authState = await this.authService.getState();

        if (authState.state === 'Failure') {
            await this.restoreData(previousData, previousState);

            this.formComponent.updateState({ type: 'SavingFailure', error: authState.error });
        } else {
            this.formComponent.updateState({ type: 'Idle' });

            this.window.close();
        }
    }

    private async restoreData(
        authData: { host: string | null; apiKey: string | null },
        authState: AuthStoreState
    ): Promise<void> {
        await this.settingsStore.updateDataSource(authData.host || '', authData.apiKey || '');
        await this.authService.rollbackState(authState);
    }
}
