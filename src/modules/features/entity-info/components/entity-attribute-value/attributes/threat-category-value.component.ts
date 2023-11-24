import { AttributeObservableEntity, ThreatCategory } from '../../../../../api/models';
import { BadgeComponent, FilledBadgeProps } from '../../../../../shared/components';
import { TranslateService } from '../../../../../shared/services';
import { ValueWithConfidenceComponent } from '../../value-with-confidence';

import { EntityAttributeValueProps } from '../entity-attribute-value.component.types';

export const createThreatCategoryAttributeValueComponent = (
    props: EntityAttributeValueProps<AttributeObservableEntity.ThreatCategory>,
    translateService: TranslateService
) => {
    return new BadgeComponent({
        fill: 'filled',
        style: getBadgeStyle(props.value),
        content: new ValueWithConfidenceComponent(
            {
                valueContent: getBadgeText(props.value, translateService),
                confidence: props.confidence
            },
            translateService
        )
    });
};

const getBadgeStyle = (value: ThreatCategory | null): FilledBadgeProps['style'] => {
    switch (value) {
        case ThreatCategory.Malware:
            return 'error';

        case ThreatCategory.Riskware:
            return 'warning-off';

        case ThreatCategory.Adware:
            return 'warning-on';

        case ThreatCategory.Clean:
            return 'success';

        default:
            return 'contrast';
    }
};

const getBadgeText = (value: ThreatCategory | null, translateService: TranslateService): string => {
    switch (value) {
        case ThreatCategory.Malware:
        case ThreatCategory.Riskware:
        case ThreatCategory.Adware:
        case ThreatCategory.Clean:
            return translateService.translate(`Entity_ThreatCategory_Text_${value}`);

        default:
            return translateService.translate('Entity_ThreatCategory_Text_Unknown');
    }
};
