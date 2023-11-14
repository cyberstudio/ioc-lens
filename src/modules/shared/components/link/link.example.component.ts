import { LinkComponent } from './link.component';
import { Component, createExample, renderComponent } from '../../utils';

import './link.example.component.css';

class LinkExampleComponent extends Component<void> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-link-example"></div>');

        const variants = [
            new LinkComponent({
                type: 'regular',
                text: 'Regular link',
                href: 'https://google.com'
            }),
            new LinkComponent({
                type: 'pseudo',
                text: 'Pseudo link',
                onClick: () => console.log('click')
            })
        ];

        const variantsWithLongText = [
            new LinkComponent({
                type: 'regular',
                text: 'Regular link with loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong text',
                href: 'https://google.com'
            }),

            new LinkComponent({
                type: 'pseudo',
                text: 'Pseudo link with loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong text',
                onClick: () => console.log('click')
            })
        ];

        const variantsWrapper = this.parseTemplate('<div class="kbq-link-example__row"></div>');

        variants.forEach((v) => renderComponent(variantsWrapper, v));

        el.appendChild(variantsWrapper);

        variantsWithLongText.forEach((v) => {
            const wrapper = this.parseTemplate('<div class="kbq-link-example__row"></div>');

            renderComponent(wrapper, v);

            el.appendChild(wrapper);
        });

        return el;
    }
}

export const linkComponentExample = createExample('Link', new LinkExampleComponent());
