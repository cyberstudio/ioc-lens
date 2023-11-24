import { AttributeObservableEntity } from '../../../../../api/models';
import { BadgeComponent } from '../../../../../shared/components';
import { TranslateService } from '../../../../../shared/services';
import { ValueWithConfidenceComponent } from '../../value-with-confidence';

import { EntityAttributeValueProps } from '../entity-attribute-value.component.types';

export const createIsDGAAttributeValueComponent = (
    props: EntityAttributeValueProps<AttributeObservableEntity.IsDGA>,
    translateService: TranslateService
) => {
    return new BadgeComponent({
        fill: 'outline',
        style: 'warning',
        content: new ValueWithConfidenceComponent(
            {
                valueContent: translateService.translate('Entity_AttributeName_Text_IsDGA'),
                confidence: props.confidence
            },
            translateService
        )
    });
};
