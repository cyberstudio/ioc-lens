import { TooltipComponent } from '../../components';

const directiveName = 'kbq-title';

class KbqTitleDirective {
    private tooltip: TooltipComponent | null = null;

    constructor() {
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        document.addEventListener('mouseenter', this.handleMouseEnter, { capture: true });
        document.addEventListener('mouseleave', this.handleMouseLeave, { capture: true });
    }

    destroy() {
        document.removeEventListener('mouseenter', this.handleMouseEnter);
        document.removeEventListener('mouseleave', this.handleMouseLeave);

        this.tooltip?.destroy();
    }

    handleMouseEnter(event: MouseEvent): void {
        if (event.target instanceof HTMLElement) {
            const titleEl = this.findTitleElement(event.target);

            if (titleEl) {
                const isNeedTitle =
                    titleEl.offsetWidth < titleEl.scrollWidth || titleEl.offsetHeight < titleEl.scrollHeight;

                if (!isNeedTitle) {
                    return;
                }

                const tooltip = this.getTooltip(titleEl, titleEl.innerText.trim());

                tooltip.show();
            }
        }
    }

    handleMouseLeave(event: MouseEvent): void {
        if (event.target instanceof HTMLElement) {
            const titleEl = this.findTitleElement(event.target);

            if (titleEl && this.tooltip) {
                this.tooltip.hide();
            }
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

export const destroyKbqTitle = () => {
    if (directive) {
        directive.destroy();
    }
};
