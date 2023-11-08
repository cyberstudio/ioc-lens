import { Component, createExample, renderComponent } from '../../utils';
import { ToggleFieldComponent } from './toggle-field.component';

import './toggle-field.example.component.css';

class ToggleFieldExampleComponent extends Component<void> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-toggle-field-example"></div>');

        const variants = [
            new ToggleFieldComponent({
                onChange: (value) => console.log(value)
            })
        ];

        variants.forEach((v) => {
            const wrapper = this.parseTemplate('<div class="kbq-toggle-field-example__row"></div>');

            renderComponent(wrapper, v);

            el.appendChild(wrapper);
        });

        return el;
    }
}

export const toggleFieldComponentExample = createExample('Toggle Field', new ToggleFieldExampleComponent());
