import { Component, renderComponent } from '../../utils';
import isNil from 'lodash/isNil';

import './tooltip.component.css';

interface TooltipProps {
    target: HTMLElement;
    trigger?: 'hover' | 'manual';
    text: string;
}

export class TooltipComponent extends Component<TooltipProps> {
    get isVisible(): boolean {
        return this.el?.classList.contains('kbq-tooltip--visible') || false;
    }

    private targetObserver: MutationObserver | null = null;

    constructor(props: TooltipProps) {
        super(props);

        this.setDefaultProps();

        renderComponent(document.body, this);

        if (this.props.trigger === 'hover') {
            this.initHoverEvents();
        }

        this.initRemoveTargetListener();

        this.globalOn('scroll', () => this.hide(), { capture: true });
    }

    attachTarget(target: HTMLElement): void {
        this.props.target = target;

        this.initRemoveTargetListener();
    }

    updateText(text: string): void {
        this.props.text = text;

        if (this.el) {
            const contentEl = this.el.querySelector('.kbq-tooltip__content');

            if (contentEl) {
                contentEl.textContent = this.props.text;
            }
        }
    }

    show(): void {
        if (this.isVisible) {
            return;
        }

        this.updateTooltipPosition();

        this.el?.classList.toggle('kbq-tooltip--visible', true);
    }

    hide(): void {
        if (!this.isVisible) {
            return;
        }

        this.el?.classList.toggle('kbq-tooltip--visible', false);
    }

    destroy() {
        super.destroy();

        this.stopListenRemoveTarget();
    }

    private setDefaultProps() {
        if (isNil(this.props.trigger)) {
            this.props.trigger = 'hover';
        }
    }

    private initHoverEvents(): void {
        this.on(this.props.target, 'mouseenter', () => this.show());
        this.on(this.props.target, 'mouseleave', () => this.hide());
    }

    private initRemoveTargetListener() {
        this.stopListenRemoveTarget();

        this.targetObserver = new MutationObserver(() => {
            if (!document.body.contains(this.props.target)) {
                this.hide();
                this.stopListenRemoveTarget();
            }
        });

        if (this.props.target.parentElement) {
            this.targetObserver.observe(document.body, { childList: true, subtree: true });
        }
    }

    private stopListenRemoveTarget(): void {
        if (this.targetObserver) {
            this.targetObserver.disconnect();
            this.targetObserver = null;
        }
    }

    private updateTooltipPosition(): void {
        if (this.el === null) {
            return;
        }

        const position = this.calculateTooltipPosition(this.props.target, this.el);

        this.el.style.top = `${position.top}px`;
        this.el.style.left = `${position.left}px`;
    }

    private calculateTooltipPosition(targetElement: HTMLElement, tooltipElement: HTMLElement) {
        const targetRect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();

        const top = targetRect.bottom + window.scrollY;
        const left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;

        return { top, left };
    }

    protected createComponent(): HTMLElement {
        const el = this.parseTemplate(`
            <div class="kbq-tooltip kbq-tooltip--hidden kbq-typography-text-normal">
                <div class="kbq-tooltip__inner">
                    <div class="kbq-tooltip__arrow"></div>
                    <div class="kbq-tooltip__content">${this.props.text}</span>
                </div>
            </div>
        `);

        return el;
    }
}
