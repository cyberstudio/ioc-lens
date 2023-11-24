import { AttributeObservableEntity } from '../../../../../api/models';
import { TooltipComponent } from '../../../../../shared/components';
import { TranslateService } from '../../../../../shared/services';
import { Component } from '../../../../../shared/utils';
import { FileSizeUnit, formatBytesToFileSize } from '../../../formatters';
import { ValueWithConfidenceComponent } from '../../value-with-confidence';

import { EntityAttributeValueProps } from '../entity-attribute-value.component.types';

class ValueContentComponent extends Component<EntityAttributeValueProps<AttributeObservableEntity.Size>> {
    constructor(
        props: EntityAttributeValueProps<AttributeObservableEntity.Size>,
        private translateService: TranslateService
    ) {
        super(props);
    }

    protected createComponent(): HTMLElement {
        const el = document.createElement('div');
        const valueEl = document.createElement('span');

        const size = formatBytesToFileSize(this.props.value);

        valueEl.textContent = this.translateFileSize(size.value, size.unit);

        if (size.unit !== FileSizeUnit.B) {
            const tooltip = new TooltipComponent({
                target: valueEl,
                text: this.translateFileSize(this.props.value, FileSizeUnit.B)
            });

            this.registerInnerComponent(tooltip);
        }

        el.appendChild(valueEl);

        return el;
    }

    private translateFileSize(size: number, unit: FileSizeUnit): string {
        return `${this.translateService.translateNumber(size)} ${unit}`;
    }
}

export const createSizeAttributeValueComponent = (
    props: EntityAttributeValueProps<AttributeObservableEntity.Size>,
    translateService: TranslateService
) => {
    return new ValueWithConfidenceComponent(
        {
            valueContent: new ValueContentComponent(props, translateService),
            confidence: props.confidence
        },
        translateService
    );
};
