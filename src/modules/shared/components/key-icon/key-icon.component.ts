import { Component } from '../../utils';

import './key-icon.component.css';

interface KeyIconProps {
    top: number;
    left: number;
    onClick?: (event: Event) => void;
}

export class KeyIconComponent extends Component<KeyIconProps> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate(`
            <button class="kbq-key-icon-button">
                <div class="kbq-key-icon-button__icon"></div>
            </button>
        `);

        el.style.left = `${this.props.left}px`;
        el.style.top = `${this.props.top}px`;

        this.on(el, 'click', (e) => {
            if (this.props.onClick) {
                this.props.onClick(e);
            }
        });

        el.style.visibility = 'hidden';

        return el;
    }

    hide() {
        if (this.el) {
            this.el.style.visibility = 'hidden';
        }
    }

    show(props: KeyIconProps) {
        if (!this.el) {
            return;
        }

        if (props) {
            this.props = { ...this.props, ...props };

            this.el.style.left = `${this.props.left}px`;
            this.el.style.top = `${this.props.top}px`;
        }

        this.el.style.visibility = 'visible';
    }
}
