import { initKbqTitle } from '../../directives';
import { Component } from '../../utils';

import './badge.component.css';

export interface FilledBadgeProps {
    fill: 'filled';
    style: 'error' | 'warning-off' | 'warning-on' | 'success' | 'dark' | 'contrast';
    content: string | Component<unknown>;
}

export interface OutlineBadgeProps {
    fill: 'outline';
    style: 'error' | 'warning' | 'contrast';
    content: string | Component<unknown>;
}
export type BadgeProps = FilledBadgeProps | OutlineBadgeProps;

export class BadgeComponent extends Component<BadgeProps> {
    protected createComponent() {
        const el = this.parseTemplate('<span class="kbq-badge kbq-typography-extra-small-text-strong"></span>');
        const contentEl = this.parseTemplate('<span class="kbq-badge__content"></span>');

        el.appendChild(contentEl);

        this.initFill(el);
        this.initStyle(el);

        if (typeof this.props.content === 'string') {
            contentEl.textContent = this.props.content;
        } else {
            contentEl.appendChild(this.props.content.render());
        }

        initKbqTitle(contentEl);

        return el;
    }

    private initFill(element: HTMLElement): void {
        switch (this.props.fill) {
            case 'filled':
                element.classList.add('kbq-badge--filled');
                break;
            case 'outline':
                element.classList.add('kbq-badge--outline');
                break;
            default:
                break;
        }
    }

    private initStyle(element: HTMLElement): void {
        switch (this.props.style) {
            case 'contrast':
                element.classList.add('kbq-badge--contrast');
                break;
            case 'warning':
                element.classList.add('kbq-badge--warning');
                break;
            case 'warning-off':
                element.classList.add('kbq-badge--warning-off');
                break;
            case 'warning-on':
                element.classList.add('kbq-badge--warning-on');
                break;
            case 'error':
                element.classList.add('kbq-badge--error');
                break;
            case 'success':
                element.classList.add('kbq-badge--success');
                break;
            case 'dark':
                element.classList.add('kbq-badge--dark');
                break;
            default:
                break;
        }
    }
}
