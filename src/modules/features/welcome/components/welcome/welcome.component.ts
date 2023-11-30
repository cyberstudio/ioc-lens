import { AuthErrorAlertComponent, ProgressSpinnerComponent, ToggleFieldComponent } from '../../../../shared/components';
import { TranslateService } from '../../../../shared/services';
import { AuthStoreState } from '../../../../shared/stores';
import { Component } from '../../../../shared/utils';

import './welcome.component.css';

interface WelcomeProps {
    activationState: boolean;
    authState: AuthStoreState;
    onChangeActivateState: (state: boolean) => void;
    onGoToSettings: () => void;
    onRefreshAuth: () => void;
}

export class WelcomeComponent extends Component<WelcomeProps> {
    private toggleFieldComponent = new ToggleFieldComponent({
        value: false,
        onChange: (state) => this.handleChangeActivationState(state)
    });

    constructor(
        props: WelcomeProps,
        private translateService: TranslateService
    ) {
        super(props);
    }

    updateAuthState(state: AuthStoreState): void {
        this.props = { ...this.props, authState: state };

        this.renderAuthInfo(this.el);
    }

    updateActivationState(state: boolean): void {
        this.props = { ...this.props, activationState: state };

        this.renderActivationField(this.el);
        this.renderAuthInfo(this.el);
    }

    protected createComponent(): HTMLElement {
        const el = this.parseTemplate(`
            <div class="kbq-welcome caption">
                <div class="kbq-welcome__header">
                    <div class="kbq-welcome__icon"></div>
                    <h1 class="kbq-welcome__title title">
                        ${this.translateService.translate('Common_App_Text_Name')}
                    </h1>
                    <div class="kbq-welcome__activation">
                        <div class="kbq-welcome__activation-field"></div>
                        <div class="kbq-welcome__activation-status"></div>
                    </div>
                </div>
                <div class="kbq-welcome__body">
                    <h2 class="kbq-welcome__instruction-title caption">
                        ${this.translateService.translate('Welcome_Instruction_Text_Title')}
                    </h2>
                    <div class="kbq-welcome__instruction-body">
                        ${this.translateService.translate('Welcome_Instruction_Text_Description')}
                    </div>
                </div>
                <div class="kbq-welcome__auth-info"></div>
            </div>
        `);

        this.renderActivationField(el);
        this.renderAuthInfo(el);

        return el;
    }

    private handleChangeActivationState(state: boolean): void {
        this.props.onChangeActivateState(state);
    }

    private renderActivationField(root: HTMLElement | null): void {
        if (!root) {
            return;
        }

        const fieldEl = root.querySelector<HTMLElement>('.kbq-welcome__activation-field');
        const statusEl = root.querySelector<HTMLElement>('.kbq-welcome__activation-status');

        this.toggleFieldComponent.updateValue(this.props.activationState);

        if (fieldEl && fieldEl.innerHTML === '') {
            this.renderContent(fieldEl, this.toggleFieldComponent);
        }

        this.renderContent(
            statusEl,
            this.translateService.translate(
                this.props.activationState ? 'Welcome_ActivationState_Text_On' : 'Welcome_ActivationState_Text_Off'
            )
        );
    }

    private renderAuthInfo(root: HTMLElement | null): void {
        if (!root) {
            return;
        }

        const container = root.querySelector<HTMLElement>('.kbq-welcome__auth-info');

        if (!container) {
            return;
        }

        container.innerHTML = '';

        if (!this.props.activationState) {
            return;
        }

        if (this.props.authState.state === 'Idle') {
            this.renderContent(container, new ProgressSpinnerComponent({ size: 'compact' }));

            return;
        }

        if (this.props.authState.state === 'Failure') {
            this.renderContent(
                container,
                new AuthErrorAlertComponent(
                    {
                        error: this.props.authState.error,
                        onGoToSettings: this.props.onGoToSettings,
                        onRefreshAuth: this.props.onRefreshAuth
                    },
                    this.translateService
                )
            );

            return;
        }
    }
}
