import { ProgressSpinnerComponent } from './progress-spinner.component';
import { Component, createExample, renderComponent } from '../../utils';

import './progress-spinner.example.component.css';

class ProgressSpinnerExampleComponent extends Component<void> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-progress-spinner-example"></div>');

        const variants = [
            new ProgressSpinnerComponent({
                size: 'compact'
            }),
            new ProgressSpinnerComponent({
                size: 'big'
            })
        ];

        const variantsWrapper = this.parseTemplate('<div class="kbq-progress-spinner-example__row"></div>');

        variants.forEach((v) => renderComponent(variantsWrapper, v));

        el.appendChild(variantsWrapper);

        return el;
    }
}

export const progressSpinnerComponentExample = createExample('Progress spinner', new ProgressSpinnerExampleComponent());
