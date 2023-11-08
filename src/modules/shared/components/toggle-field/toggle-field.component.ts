import { Component } from '../../utils';

import './toggle-field.component.css';

interface ToggleFieldProps {
    value?: boolean;
    onChange?: (value: boolean) => void;
}

let fieldIndex = 0;

export class ToggleFieldComponent extends Component<ToggleFieldProps> {
    protected createComponent(): HTMLElement {
        const fieldId = `toggle-field-${fieldIndex++}`;

        const el = this.parseTemplate(`
            <label for="${fieldId}" class="kbq-toggle-field">
                <input
                    id="${fieldId}"
                    class="kbq-toggle-field__input"
                    type="checkbox"
                    role="switch"/>
                <div class="kbq-toggle-field__bar">
                    <div class="kbq-toggle-field__circle"></div>
                </div>
            </label>
        `);

        this.toggleField(el, this.props.value || false);

        this.on(el, 'input', (event) => {
            this.handleChangeValue(event);
        });

        return el;
    }

    handleChangeValue(event: Event): void {
        if (event.target instanceof HTMLInputElement && this.el) {
            const checked = event.target.checked;

            this.toggleField(this.el, checked);

            if (this.props.onChange) {
                this.props.onChange(checked);
            }
        }
    }

    updateValue(value: boolean): void {
        if (this.el) {
            this.toggleField(this.el, value);
        }
    }

    private toggleField(root: HTMLElement, value: boolean) {
        root.classList.toggle('kbq-toggle-field--checked', value);

        const inputEl = root.querySelector('.kbq-toggle-field__input') as HTMLInputElement;

        if (inputEl) {
            inputEl.checked = value;
        }
    }
}
