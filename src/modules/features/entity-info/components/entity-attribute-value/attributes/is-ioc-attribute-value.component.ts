import { AttributeObservableEntity } from '../../../../../api/models';
import { BadgeComponent } from '../../../../../shared/components';
import { TranslateService } from '../../../../../shared/services';
import { ValueWithConfidenceComponent } from '../../value-with-confidence';

import { EntityAttributeValueProps } from '../entity-attribute-value.component.types';

export const createIsIoCAttributeValueComponent = (
    props: EntityAttributeValueProps<AttributeObservableEntity.IsIoC>,
    translateService: TranslateService
) => {
    return new BadgeComponent({
        fill: 'outline',
        style: 'error',
        content: new ValueWithConfidenceComponent(
            {
                valueContent: translateService.translate('Entity_AttributeName_Text_IsIoC'),
                confidence: props.confidence
            },
            translateService
        )
    });
};
