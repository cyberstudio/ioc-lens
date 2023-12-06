import { Component, createExample, renderComponent } from '../../utils';

import './key-icon.example.component.css';
import { KeyIconComponent } from './key-icon.component';

class KeyIconExampleComponent extends Component<void> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-key-icon-example"></div>');

        const variants = [
            new KeyIconComponent({
                top: 0,
                left: 0,
                onClick: () => console.log('click')
            })
        ];

        const variantsWrapper = this.parseTemplate('<div class="kbq-key-icon-example__row"></div>');

        variants.forEach((v) => renderComponent(variantsWrapper, v));

        el.appendChild(variantsWrapper);

        return el;
    }
}

export const keyIconComponentExample = createExample('Button', new KeyIconExampleComponent());
