import { TooltipComponent } from '../../components';

const directiveName = 'kbq-title';

class KbqTitleDirective {
    private tooltip: TooltipComponent | null = null;

    constructor() {
        document.addEventListener(
            'mouseenter',
            (event) => {
                if (event.target instanceof HTMLElement) {
                    const titleEl = this.findTitleElement(event.target);

                    if (titleEl) {
                        this.handleMouseEnter(titleEl);
                    }
                }
            },
            { capture: true }
        );

        document.addEventListener(
            'mouseleave',
            (event) => {
                if (event.target instanceof HTMLElement) {
                    const titleEl = this.findTitleElement(event.target);

                    if (titleEl) {
                        this.handleMouseLeave();
                    }
                }
            },
            { capture: true }
        );
    }

    handleMouseEnter(titleEl: HTMLElement): void {
        const isNeedTitle = titleEl.offsetWidth < titleEl.scrollWidth || titleEl.offsetHeight < titleEl.scrollHeight;

        if (!isNeedTitle) {
            return;
        }

        const tooltip = this.getTooltip(titleEl, titleEl.innerText.trim());

        tooltip.show();
    }

    handleMouseLeave(): void {
        if (this.tooltip) {
            this.tooltip.hide();
        }
    }

    private findTitleElement(el: HTMLElement): HTMLElement | null {
        if (el.matches(`[${directiveName}]`)) {
            return el;
        }

        return el.closest(`[${directiveName}]`);
    }

    private getTooltip(el: HTMLElement, text: string): TooltipComponent {
        if (this.tooltip) {
            this.tooltip.attachTarget(el);
            this.tooltip.updateText(text);
            this.tooltip.hide();

            return this.tooltip;
        }

        this.tooltip = new TooltipComponent({ target: el, trigger: 'manual', text });

        return this.tooltip;
    }
}

let directive: KbqTitleDirective | null = null;

export const initKbqTitle = (el: HTMLElement) => {
    if (el.querySelectorAll(`[${directiveName}]`).length > 0 || el.hasAttribute(directiveName)) {
        return;
    }

    el.setAttribute(directiveName, '');

    if (directive) {
        return;
    }

    directive = new KbqTitleDirective();
};
