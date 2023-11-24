import { AttributeObservableEntity } from '../../../../../api/models';
import { BadgeComponent } from '../../../../../shared/components';
import { TranslateService } from '../../../../../shared/services';
import { ValueWithConfidenceComponent } from '../../value-with-confidence';

import { EntityAttributeValueProps } from '../entity-attribute-value.component.types';

export const createIsTrustedAttributeValueComponent = (
    props: EntityAttributeValueProps<AttributeObservableEntity.IsTrusted>,
    translateService: TranslateService
) => {
    return new BadgeComponent({
        fill: 'outline',
        style: 'contrast',
        content: new ValueWithConfidenceComponent(
            {
                valueContent: translateService.translate('Entity_AttributeName_Text_IsTrusted'),
                confidence: props.confidence
            },
            translateService
        )
    });
};
