import { Component } from '../../../../shared/utils';

import './key-highlighter.component.css';

export interface KeyHighlighterProps {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class KeyHighlighter extends Component<KeyHighlighterProps> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-key-highlighter"></div>');

        return el;
    }

    hide() {
        if (this.el) {
            this.el.style.visibility = 'hidden';
        }
    }

    show(props: KeyHighlighterProps) {
        if (!this.el) {
            return;
        }

        this.props = { ...this.props, ...props };

        this.el.style.left = `${this.props.x}px`;
        this.el.style.top = `${this.props.y}px`;
        this.el.style.width = `${this.props.width}px`;
        this.el.style.height = `${this.props.height}px`;

        this.el.style.visibility = 'visible';
    }
}
