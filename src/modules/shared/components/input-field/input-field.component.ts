import { Component } from '../../utils';

import './input-field.component.css';

interface InputFieldProps {
    id?: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

export class InputFieldComponent extends Component<InputFieldProps> {
    get id(): string {
        return this.props.id || '';
    }

    get value(): string {
        if (this.el) {
            return (this.el as HTMLInputElement).value;
        }

        return '';
    }

    updateValue(value: string) {
        if (this.el) {
            (this.el as HTMLInputElement).value = value;
        }
    }

    protected createComponent(): HTMLElement {
        const el = this.parseTemplate(`<input type="text" class="kbq-input-field small-text" />`);

        if (this.props.id) {
            el.setAttribute('id', this.props.id);
        }

        if (this.props.placeholder) {
            el.setAttribute('placeholder', this.props.placeholder);
        }

        if (this.props.value && el instanceof HTMLInputElement) {
            el.value = this.props.value;
        }

        this.on(el, 'input', (event) => {
            this.handleChangeValue(event);
        });

        return el;
    }

    handleChangeValue(event: Event): void {
        if (event.target instanceof HTMLInputElement && this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }
}
