import { TooltipComponent } from './tooltip.component';
import { Component, createExample } from '../../utils';

class TooltipExampleComponent extends Component<void> {
    protected createComponent(): HTMLElement {
        const el = document.createElement('div');

        el.appendChild(this.createHoverTooltip('Example tooltip'));
        el.appendChild(this.createHoverTooltip('Example very looooooooooooooooooooooooooooooooong tooltip'));

        return el;
    }

    private createHoverTooltip(text: string): HTMLElement {
        const root = document.createElement('div');
        const el = document.createElement('span');

        el.textContent = text;

        new TooltipComponent({
            target: el,
            text
        });

        root.appendChild(el);

        return root;
    }
}

export const tooltipComponentExample = createExample('Tooltip', new TooltipExampleComponent());
