import {
    AlertComponent,
    ButtonComponent,
    InputFieldComponent,
    ProgressSpinnerComponent
} from '../../../../shared/components';
import { TranslateService } from '../../../../shared/services';
import { AuthFailureState } from '../../../../shared/stores';
import { Component } from '../../../../shared/utils';

import './settings-form.component.css';

type IdleSettingsFormState = { type: 'Idle' };
type SavingSettingsFormState = { type: 'Saving' };
type SavingFailureSettingsFormState = { type: 'SavingFailure'; error: AuthFailureState['error'] };

type SettingsFormProps = {
    state: IdleSettingsFormState | SavingSettingsFormState | SavingFailureSettingsFormState;
    data: {
        host: string | null;
        apiKey: string | null;
    };
    onSend: (data: { host: string; apiKey: string }) => void;
};

export class SettingsFormComponent extends Component<SettingsFormProps> {
    private hostInputComponent = new InputFieldComponent({
        id: 'host-field',
        value: this.props.data.host || ''
    });

    private apiKeyInputComponent = new InputFieldComponent({
        id: 'api-key-field',
        value: this.props.data.apiKey || ''
    });

    private submitButtonComponent = new ButtonComponent({
        type: 'primary',
        text: this.translateService.translate('Common_Pseudo_Text_Save')
    });

    constructor(
        props: SettingsFormProps,
        private translateService: TranslateService
    ) {
        super(props);
    }

    updateState(state: SettingsFormProps['state']): void {
        this.props = { ...this.props, state };

        this.toggleProgressVisibility();
        this.toggleErrorVisibility();
    }

    updateData(data: SettingsFormProps['data']): void {
        this.props = { ...this.props, data };

        this.hostInputComponent.updateValue(this.props.data.host || '');
        this.apiKeyInputComponent.updateValue(this.props.data.apiKey || '');
    }

    protected createComponent(): HTMLElement {
        const el = this.parseTemplate(`
            <form class="kbq-settings-form">
                <div class="kbq-settings-form__fields"></div>
                <div class="kbq-settings-form__errors"></div>
                <div class="kbq-settings-form__actions"></div>
            </form>
        `);

        const fieldsEl = el.querySelector<HTMLElement>('.kbq-settings-form__fields');
        const actionsEl = el.querySelector<HTMLElement>('.kbq-settings-form__actions');

        this.renderContent(
            fieldsEl,
            this.createFieldElement(
                this.translateService.translate('Settings_FormField_Text_Host'),
                this.hostInputComponent
            )
        );
        this.renderContent(
            fieldsEl,
            this.createFieldElement(
                this.translateService.translate('Settings_FormField_Text_Key'),
                this.apiKeyInputComponent
            )
        );
        this.renderContent(actionsEl, this.submitButtonComponent);

        this.on(el, 'submit', (e) => this.handleSubmit(e));

        return el;
    }

    private handleSubmit(event: SubmitEvent): void {
        event.preventDefault();

        this.props.onSend({
            host: this.hostInputComponent.value,
            apiKey: this.apiKeyInputComponent.value
        });
    }

    private createFieldElement(label: string, field: InputFieldComponent): HTMLElement {
        const el = this.parseTemplate(`
            <div class="kbq-settings-form__field">
                <label class="kbq-settings-form__field-label" for="${field.id}">${label}</label>
            </div>
        `);

        this.renderContent(el, field);

        return el;
    }

    private toggleProgressVisibility(): void {
        const root = this.el;

        if (!root) {
            return;
        }

        const currentState = this.props.state.type;
        const currentSpinnerContainer = root.querySelector('.kbq-settings-form__spinner');

        if (currentState !== 'Saving') {
            currentSpinnerContainer?.remove();

            return;
        }

        if (currentSpinnerContainer) {
            return;
        }

        if (currentState === 'Saving') {
            const spinnerContainer = this.parseTemplate('<div class="kbq-settings-form__spinner"></div>');

            this.renderContent(spinnerContainer, new ProgressSpinnerComponent({ size: 'big' }));
            this.renderContent(root, spinnerContainer);
        }
    }

    private toggleErrorVisibility(): void {
        const root = this.el?.querySelector<HTMLElement>('.kbq-settings-form__errors');

        if (!root) {
            return;
        }

        root.innerHTML = '';

        const currentState = this.props.state;

        if (currentState.type !== 'SavingFailure') {
            return;
        }

        this.renderContent(root, this.createErrorAlert(currentState));
    }

    private createErrorAlert(state: SavingFailureSettingsFormState): AlertComponent {
        switch (state.error) {
            case 'UnknownApiKey': {
                return new AlertComponent({ text: this.translateService.translate('Auth_Error_Text_UnknownApiKey') });
            }

            case 'Forbidden': {
                return new AlertComponent({ text: this.translateService.translate('Auth_Error_Text_Forbidden') });
            }

            default: {
                return new AlertComponent({ text: this.translateService.translate('Auth_Error_Text_Unknown') });
            }
        }
    }
}
