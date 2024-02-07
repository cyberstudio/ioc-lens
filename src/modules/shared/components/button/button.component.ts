import { initKbqTitle } from '../../directives';
import { Component } from '../../utils';

import './button.component.css';

interface TextButtonProps {
    type: 'primary' | 'transparent';
    text: string;
    onClick?: (event: Event) => void;
}

interface IconButtonProps {
    type: 'icon';
    iconName: 'close' | 'back';
    onClick?: (event: Event) => void;
}

type ButtonProps = TextButtonProps | IconButtonProps;

export class ButtonComponent extends Component<ButtonProps> {
    private icons = {
        close: `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M4.81795 3.40379C4.42742 3.01327 3.79426 3.01327 3.40373 3.40379C3.01321 3.79432 3.01321 4.42748 3.40373 4.81801L6.58571 7.99999L3.40373 11.182C3.01321 11.5725 3.01321 12.2057 3.40373 12.5962C3.79426 12.9867 4.42742 12.9867 4.81795 12.5962L7.99993 9.4142L11.1819 12.5962C11.5724 12.9867 12.2056 12.9867 12.5961 12.5962C12.9866 12.2057 12.9866 11.5725 12.5961 11.182L9.41414 7.99999L12.5961 4.81801C12.9866 4.42748 12.9866 3.79432 12.5961 3.40379C12.2056 3.01327 11.5724 3.01327 11.1819 3.40379L7.99993 6.58577L4.81795 3.40379Z" />
            </svg>
        `,
        back: `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M5.32907 9L7.1575 10.8285C7.54801 11.2191 7.54801 11.8522 7.15749 12.2427C6.76696 12.6333 6.13378 12.6333 5.74326 12.2427L2.2822 8.78155C1.85059 8.34992 1.85059 7.65012 2.28221 7.2185L5.74333 3.75737C6.13388 3.36683 6.76702 3.36686 7.15754 3.75738C7.54807 4.14791 7.54809 4.78106 7.15754 5.1716L5.32924 7H13.5002C14.0525 7 14.5002 7.44772 14.5002 8C14.5002 8.55229 14.0525 9 13.5002 9H5.32907Z" />
            </svg>
        `
    };

    protected createComponent(): HTMLElement {
        const el = this.parseTemplate(
            `<button class="kbq-button kbq-button--${this.props.type} kbq-typography-text-normal"></button>`
        );

        if (this.props.type === 'icon') {
            el.appendChild(
                this.parseTemplate(`<span class="kbq-button__icon">${this.icons[this.props.iconName]}</span>`)
            );
        } else {
            const textTemplate = this.parseTemplate(`<span class="kbq-button__text">${this.props.text}</span>`);

            initKbqTitle(textTemplate);

            el.appendChild(textTemplate);
        }

        this.on(el, 'click', (e) => {
            if (this.props.onClick) {
                this.props.onClick(e);
            }
        });

        return el;
    }
}
