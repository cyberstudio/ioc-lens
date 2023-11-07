import { Component } from '../../utils';

import './input-field.component.css';

interface InputFieldProps {
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

export class InputFieldComponent extends Component<InputFieldProps> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate(`<input type="text" class="kbq-input-field small-text" />`);

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
