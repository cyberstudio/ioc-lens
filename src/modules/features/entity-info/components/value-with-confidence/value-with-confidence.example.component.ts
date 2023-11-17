import { ValueWithConfidenceComponent } from './value-with-confidence.component';
import { Component, createExample, renderComponent } from '../../../../shared/utils';

import './value-with-confidence.example.component.css';
import { TranslateService } from '../../../../shared/services';

class ValueWithConfidenceExampleComponent extends Component<void> {
    protected createComponent(): HTMLElement {
        const translateService = new TranslateService();

        const el = this.parseTemplate('<div class="kbq-value-with-confidence-example"></div>');

        const variants = [
            new ValueWithConfidenceComponent(
                {
                    valueContent: 'Значение',
                    confidence: 1
                },
                translateService
            ),

            new ValueWithConfidenceComponent(
                {
                    valueContent: 'Значение низкой достоверностью',
                    confidence: 0.15
                },
                translateService
            ),

            new ValueWithConfidenceComponent(
                {
                    valueContent: 'Значение достоверностью близкой к нулю',
                    confidence: 0.015
                },
                translateService
            )
        ];

        variants.forEach((v) => {
            const variantsWrapper = this.parseTemplate('<div class="kbq-value-with-confidence-example__row"></div>');

            renderComponent(variantsWrapper, v);

            el.appendChild(variantsWrapper);
        });

        return el;
    }
}

export const valueWithConfidenceComponentExample = createExample(
    'Value with confidence',
    new ValueWithConfidenceExampleComponent()
);
