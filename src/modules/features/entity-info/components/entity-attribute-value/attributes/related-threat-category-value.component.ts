import { AttributeObservableEntity, RelatedThreatCategory } from '../../../../../api/models';
import { BadgeComponent, FilledBadgeProps } from '../../../../../shared/components';
import { TranslateService } from '../../../../../shared/services';
import { ValueWithConfidenceComponent } from '../../value-with-confidence';

import { EntityAttributeValueProps } from '../entity-attribute-value.component.types';

export const createRelatedThreatCategoryAttributeValueComponent = (
    props: EntityAttributeValueProps<AttributeObservableEntity.RelatedThreatCategory>,
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

const getBadgeStyle = (value: RelatedThreatCategory | null): FilledBadgeProps['style'] => {
    switch (value) {
        case RelatedThreatCategory.Malware:
            return 'error';

        case RelatedThreatCategory.Riskware:
            return 'warning-off';

        case RelatedThreatCategory.Adware:
            return 'warning-on';

        default:
            return 'contrast';
    }
};

const getBadgeText = (value: RelatedThreatCategory | null, translateService: TranslateService): string => {
    switch (value) {
        case RelatedThreatCategory.Malware:
        case RelatedThreatCategory.Riskware:
        case RelatedThreatCategory.Adware:
            return translateService.translate(`Entity_RelatedThreatCategory_Text_${value}`);

        default:
            return translateService.translate('Entity_RelatedThreatCategory_Text_Unknown');
    }
};
