import { Component } from '../../utils';
import './alert.component.css';

interface AlertProps {
    text: string;
    action?: Component<unknown>;
}

export class AlertComponent extends Component<AlertProps> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-alert caption"></div>');
        const contentEl = this.parseTemplate('<div class="kbq-alert__content"></div>');

        el.appendChild(contentEl);

        contentEl.textContent = this.props.text;

        if (this.props.action) {
            const actionEl = this.parseTemplate('<div class="kbq-alert__action"></div>');
            el.appendChild(actionEl);
            this.renderContent(actionEl, this.props.action);
        }

        return el;
    }
}
