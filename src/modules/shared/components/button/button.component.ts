import { initKbqTitle } from '../../directives';
import { Component } from '../../utils';

import './button.component.css';

interface TextButtonProps {
    type: 'primary' | 'transparent';
    domType?: 'button' | 'submit';
    text: string;
    onClick?: (event: Event) => void;
}

interface IconButtonProps {
    type: 'icon';
    domType?: 'button' | 'submit';
    iconName: 'close' | 'back' | 'eye' | 'eye-crossed';
    onClick?: (event: Event) => void;
}

type ButtonProps = TextButtonProps | IconButtonProps;

export class ButtonComponent extends Component<ButtonProps> {
    get domType(): ButtonProps['domType'] {
        return this.props.domType || 'button';
    }

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
        `,
        eye: `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M1.09343 8.92041C3.16825 11.5904 5.47687 13.0025 8.00143 13C10.5241 12.9975 12.8314 11.5862 14.9057 8.92137L15.6229 8.00002L14.9058 7.07866C12.8314 4.41367 10.5241 3.00236 8.00136 3C5.47684 2.99765 3.16825 4.40972 1.09345 7.07957L0.378174 7.99998L1.09343 8.92041ZM13.7221 8C11.9073 10.3314 9.99996 11.498 7.99996 11.5C5.99996 11.502 4.09259 10.3353 2.27785 8C3.40305 6.5521 4.56387 5.55343 5.76029 5.00399C5.28737 5.53427 4.99996 6.23357 4.99996 7C4.99996 8.65685 6.34311 10 7.99996 10C9.65682 10 11 8.65685 11 7C11 6.23572 10.7142 5.53819 10.2436 5.00846C11.4386 5.55883 12.5981 6.55601 13.7221 8ZM5.99996 7C5.99996 5.89543 6.89539 5 7.99996 5V6C7.44768 6 6.99996 6.44772 6.99996 7H5.99996Z" />
            </svg>
        `,
        'eye-crossed': `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M3.54998 2.55002C3.3547 2.35499 3.03829 2.35507 2.84311 2.55026L2.48956 2.90381C2.29429 3.09907 2.29429 3.41565 2.48956 3.61092L3.50724 4.6286C2.67085 5.26584 1.86595 6.08553 1.09345 7.07958L0.378174 7.99999L1.09343 8.92041C3.16825 11.5904 5.47687 13.0025 8.00143 13C9.07937 12.999 10.118 12.7407 11.1159 12.2373L12.389 13.5104C12.5843 13.7057 12.9009 13.7057 13.0962 13.5104L13.4497 13.1569C13.6448 12.9618 13.645 12.6456 13.4503 12.4503C13.4501 12.4501 13.4499 12.4499 13.4497 12.4497L12.422 11.422L11.3483 10.3483L10.1213 9.12132L7.29286 6.2929L6.58575 5.58579L4.80191 3.80195L3.55022 2.55026C3.55014 2.55018 3.55006 2.5501 3.54998 2.55002ZM5.7893 3.37513L7.48192 5.06775C7.64715 5.02356 7.8208 5 7.99996 5V5.58579L10.7076 8.29342C10.895 7.90178 11 7.46315 11 7C11 6.23572 10.7142 5.53819 10.2436 5.00846C11.4386 5.55883 12.5981 6.55602 13.7221 8C13.2007 8.66977 12.6717 9.24341 12.1351 9.72093L13.197 10.7828C13.7829 10.2534 14.3526 9.63197 14.9057 8.92137L15.6229 8.00002L14.9058 7.07866C12.8314 4.41367 10.5241 3.00236 8.00136 3.00001C7.24444 2.9993 6.50692 3.12575 5.7893 3.37513ZM4.99996 7C4.99996 6.73126 5.0353 6.47078 5.10158 6.22294L4.57926 5.70062C3.79625 6.26682 3.02911 7.03328 2.27785 8C4.09259 10.3353 5.99996 11.502 7.99996 11.5C8.67138 11.4993 9.33235 11.3674 9.98289 11.1042L8.77703 9.89839C8.52919 9.96467 8.2687 10 7.99996 10C6.34311 10 4.99996 8.65686 4.99996 7Z" />
            </svg>
        `
    };

    updateIcon(icon: IconButtonProps['iconName']): void {
        if (this.props.type !== 'icon') {
            return;
        }

        if (!this.el) {
            return;
        }

        const iconContainer = this.el.querySelector<HTMLElement>('.kbq-button__icon');

        if (!iconContainer) {
            return;
        }

        this.props.iconName = icon;

        iconContainer.innerHTML = this.icons[this.props.iconName];
    }

    protected createComponent(): HTMLElement {
        const el = this.parseTemplate(
            `<button type="${this.domType}" class="kbq-button kbq-button--${this.props.type} kbq-typography-text-normal"></button>`
        );

        if (this.props.type === 'icon') {
            el.appendChild(
                this.parseTemplate(`<span class="kbq-button__icon">${this.icons[this.props.iconName]}</span>`)
            );
        } else {
            const textTemplate = this.parseTemplate(`<span class="kbq-button__text"></span>`);

            // Такой способ передачи контента для корректного отображения символов в URL
            this.renderContent(textTemplate, this.props.text);

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
