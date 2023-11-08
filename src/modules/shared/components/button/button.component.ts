import { initKbqTitle } from '../../directives';
import { Component } from '../../utils';

import './button.component.css';

interface TextButtonProps {
    type: 'primary' | 'transparent';
    text: string;
    onClick: (event: Event) => void;
}

interface IconButtonProps {
    type: 'icon';
    iconName: string;
    onClick: (event: Event) => void;
}

type ButtonProps = TextButtonProps | IconButtonProps;

export class ButtonComponent extends Component<ButtonProps> {
    protected createComponent(): HTMLElement {
        const el = this.parseTemplate(`<button class="kbq-button kbq-button--${this.props.type} small-text"></button>`);

        if (this.props.type === 'icon') {
            el.appendChild(this.parseTemplate('<span class="kbq-button__icon"></span>'));
        } else {
            const textTemplate = this.parseTemplate(`<span class="kbq-button__text">${this.props.text}</span>`);

            initKbqTitle(textTemplate);

            el.appendChild(textTemplate);
        }

        return el;
    }
}
