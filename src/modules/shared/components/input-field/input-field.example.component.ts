import { Component, createExample, renderComponent } from '../../utils';
import { InputFieldComponent } from './input-field.component';

import './input-field.example.component.css';

class InputFieldExampleComponent extends Component<void> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-input-field-example"></div>');

        const variants = [
            new InputFieldComponent({
                placeholder: 'Placeholder',
                onChange: (value) => console.log(value)
            }),
            new InputFieldComponent({
                value: 'Default value',
                placeholder: 'Placeholder',
                onChange: (value) => console.log(value)
            }),
            new InputFieldComponent({
                type: 'masked',
                value: 'Default value',
                placeholder: 'Placeholder',
                onChange: (value) => console.log(value)
            })
        ];

        variants.forEach((v) => {
            const wrapper = this.parseTemplate('<div class="kbq-input-field-example__row"></div>');

            renderComponent(wrapper, v);

            el.appendChild(wrapper);
        });

        return el;
    }
}

export const inputFieldComponentExample = createExample('Input Field', new InputFieldExampleComponent());
