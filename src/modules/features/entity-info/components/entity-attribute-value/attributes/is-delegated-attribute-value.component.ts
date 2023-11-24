import { AttributeObservableEntity } from '../../../../../api/models';
import { BadgeComponent } from '../../../../../shared/components';
import { TranslateService } from '../../../../../shared/services';
import { ValueWithConfidenceComponent } from '../../value-with-confidence';

import { EntityAttributeValueProps } from '../entity-attribute-value.component.types';

export const createIsDelegatedAttributeValueComponent = (
    props: EntityAttributeValueProps<AttributeObservableEntity.IsDelegated>,
    translateService: TranslateService
) => {
    return new BadgeComponent({
        fill: 'filled',
        style: 'contrast',
        content: new ValueWithConfidenceComponent(
            {
                valueContent: translateService.translate(
                    props.value ? 'Entity_IsDelegated_Text_Delegated' : 'Entity_IsDelegated_Text_NotDelegated'
                ),
                confidence: props.confidence
            },
            translateService
        )
    });
};
