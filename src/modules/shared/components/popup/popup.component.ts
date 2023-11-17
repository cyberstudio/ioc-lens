import { ButtonComponent } from '..';
import { Component } from '../../utils';

import './popup.component.css';

interface PopupProps {
    hasHeaderDivider?: boolean;
    headerContent: HTMLElement | Component<unknown>;
    bodyContent: HTMLElement | Component<unknown>;
    onClose: () => void;
}

export class PopupComponent extends Component<PopupProps> {
    private closeButton: ButtonComponent | null = null;

    protected createComponent(): HTMLElement {
        const el = this.parseTemplate(`
            <div class="kbq-popup">
                <div class="kbq-popup__header">
                    <div class="kbq-popup__header-content-row">
                        <div class="kbq-popup__header-icon"></div>
                        <div class="kbq-popup__header-content"></div>
                    </div>
                    <div class="kbq-popup__close"></div>
                </div>
                <div class="kbq-popup__body"></div>
            </div>
        `);

        const headerEl = el.querySelector('.kbq-popup__header');

        headerEl?.classList.toggle('kbq-popup__header--separated', this.props.hasHeaderDivider || false);

        this.renderCloseButton(el);

        this.renderContent(el.querySelector('.kbq-popup__header-content'), this.props.headerContent);
        this.renderContent(el.querySelector('.kbq-popup__body'), this.props.bodyContent);

        return el;
    }

    private renderCloseButton(root: HTMLElement): void {
        if (this.closeButton) {
            return;
        }

        this.closeButton = new ButtonComponent({
            type: 'icon',
            iconName: 'close',
            onClick: () => this.props.onClose()
        });

        this.renderContent(root?.querySelector('.kbq-popup__close'), this.closeButton);
    }
}
