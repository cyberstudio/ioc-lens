import { ButtonComponent } from '../button';
import { Component } from '../../utils';

import './input-field.component.css';

interface InputFieldProps {
    id?: string;
    type?: 'text' | 'masked';
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

export class InputFieldComponent extends Component<InputFieldProps> {
    get id(): string {
        return this.props.id || '';
    }

    get type(): InputFieldProps['type'] {
        return this.props.type || 'text';
    }

    get controlType() {
        return this.type === 'masked' ? 'password' : 'text';
    }

    get value(): string {
        if (this.controlEl) {
            return this.controlEl.value;
        }

        return '';
    }

    private controlEl: HTMLInputElement | null = null;

    updateValue(value: string): void {
        if (this.controlEl) {
            this.controlEl.value = value;
        }
    }

    protected createComponent(): HTMLElement {
        const el = this.parseTemplate(
            `<div class="kbq-input-field kbq-input-field--${this.type} kbq-typography-text-normal"></div>`
        );

        this.controlEl = this.parseTemplate(`
            <input type="${this.controlType}" class="kbq-input-field__control" />
        `) as HTMLInputElement;

        if (this.props.id) {
            this.controlEl.setAttribute('id', this.props.id);
        }

        if (this.props.placeholder) {
            this.controlEl.setAttribute('placeholder', this.props.placeholder);
        }

        if (this.props.value) {
            this.controlEl.value = this.props.value;
        }

        this.on(this.controlEl, 'input', (event) => {
            this.handleChangeValue(event);
        });

        el.appendChild(this.controlEl);

        if (this.props.type === 'masked') {
            const toggleButtonContainer = this.parseTemplate('<div class="kbq-input-field__toggle-button"></div>');

            this.renderContent(toggleButtonContainer, this.createToggleVisibilityPasswordButton());
            this.renderContent(el, toggleButtonContainer);
        }

        return el;
    }

    handleChangeValue(event: Event): void {
        if (event.target instanceof HTMLInputElement && this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }

    private createToggleVisibilityPasswordButton(): ButtonComponent {
        let isVisible: boolean = false;

        const toggleVisibility = () => {
            isVisible = !isVisible;

            button.updateIcon(isVisible ? 'eye-crossed' : 'eye');

            this.controlEl?.setAttribute('type', isVisible ? 'text' : 'password');
        };

        const button = new ButtonComponent({ type: 'icon', iconName: 'eye', onClick: toggleVisibility });

        return button;
    }
}
