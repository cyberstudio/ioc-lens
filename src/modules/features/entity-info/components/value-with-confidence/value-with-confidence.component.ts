import { ChromeI18nAdapter } from '../../../../shared/adapters';
import { TooltipComponent } from '../../../../shared/components';
import { initKbqTitle } from '../../../../shared/directives';
import { TranslateService } from '../../../../shared/services';
import { Component } from '../../../../shared/utils';

import { formatConfidence } from '../../formatters';

import './value-with-confidence.component.css';

interface ValueWithConfidenceProps {
    valueContent: string | HTMLElement | Component<unknown>;
    confidence: number | null;
}

export class ValueWithConfidenceComponent extends Component<ValueWithConfidenceProps> {
    private confidenceTooltip: TooltipComponent | null = null;

    constructor(
        props: ValueWithConfidenceProps,
        private translateService: TranslateService
    ) {
        super(props);
    }

    protected createComponent(): HTMLElement {
        const classes = {
            value: 'kbq-value-with-confidence__value',
            confidence: 'kbq-value-with-confidence__confidence'
        };

        const hasConfidence = this.props.confidence !== null;

        const el = this.parseTemplate(`
            <div class="kbq-value-with-confidence">
                <div class="${classes.value}"></div>
                ${hasConfidence ? `<div class="${classes.confidence} extra-small-text"></div>` : ''}
            </div>
        `);

        const valueEl = el.querySelector<HTMLElement>(`.${classes.value}`);
        const confidenceEl = el.querySelector<HTMLElement>(`.${classes.confidence}`);

        if (valueEl) {
            initKbqTitle(valueEl);
        }

        this.renderContent(valueEl, this.props.valueContent);

        if (this.props.confidence !== null) {
            this.renderContent(
                confidenceEl,
                formatConfidence(this.props.confidence, ChromeI18nAdapter.getCurrentLocale())
            );
        }

        if (confidenceEl) {
            this.on(confidenceEl, 'mouseenter', () => this.handleMouseEnterConfidence(confidenceEl));
            this.on(confidenceEl, 'mouseleave', () => this.handleMouseLeaveConfidence());
        }

        return el;
    }

    private handleMouseEnterConfidence(confidenceEl: HTMLElement): void {
        const text = this.translateService.translate('Entity_Confidence_Text_Tooltip');

        this.confidenceTooltip = new TooltipComponent({
            target: confidenceEl,
            trigger: 'manual',
            text
        });

        this.confidenceTooltip.show();
    }

    private handleMouseLeaveConfidence(): void {
        if (this.confidenceTooltip) {
            this.confidenceTooltip.hide();
            this.confidenceTooltip.destroy();
            this.confidenceTooltip = null;
        }
    }
}
