import { Component, createExample, renderComponent } from '../../utils';
import { AlertComponent } from './alert.component';
import { LinkComponent } from '../link';

import './alert.example.component.css';

export class AlertExampleComponent extends Component<void> {
    protected createComponent() {
        const el = this.parseTemplate('<div class="kbq-alert-example"></div>');

        const pseudoLink = new LinkComponent({
            type: 'pseudo',
            text: 'Попробуйте еще раз',
            onClick: () => console.log('click')
        });

        const alertComponent = new AlertComponent({
            text: 'Не удалось загрузить данные',
            action: pseudoLink
        });

        const alertNoActionComponent = new AlertComponent({
            text: 'Не удалось загрузить данные'
        });

        renderComponent(el, alertComponent);
        renderComponent(el, alertNoActionComponent);

        return el;
    }
}

export const alertExample = createExample('Alert', new AlertExampleComponent());
