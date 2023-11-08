import { ButtonComponent } from './button.component';
import { Component, createExample, renderComponent } from '../../utils';

import './button.example.component.css';

class ButtonExampleComponent extends Component<void> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-button-example"></div>');

        const variants = [
            new ButtonComponent({
                type: 'primary',
                text: 'Primary button',
                onClick: () => console.log('click')
            }),
            new ButtonComponent({
                type: 'transparent',
                text: 'Transparent button',
                onClick: () => console.log('click')
            })
        ];

        const variantsWithLongText = [
            new ButtonComponent({
                type: 'primary',
                text: 'Primary button with loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong text',
                onClick: () => console.log('click')
            }),

            new ButtonComponent({
                type: 'transparent',
                text: 'Transparent button with loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong text',
                onClick: () => console.log('click')
            })
        ];

        const variantsWrapper = this.parseTemplate('<div class="kbq-button-example__row"></div>');

        variants.forEach((v) => renderComponent(variantsWrapper, v));

        el.appendChild(variantsWrapper);

        variantsWithLongText.forEach((v) => {
            const wrapper = this.parseTemplate('<div class="kbq-button-example__row"></div>');

            renderComponent(wrapper, v);

            el.appendChild(wrapper);
        });

        return el;
    }
}

export const buttonComponentExample = createExample('Button', new ButtonExampleComponent());
