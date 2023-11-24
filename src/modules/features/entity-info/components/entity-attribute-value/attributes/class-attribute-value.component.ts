import { AttributeObservableEntity, IDENTITY_CLASSES } from '../../../../../api/models';
import { TranslateService } from '../../../../../shared/services';
import { ValueWithConfidenceComponent } from '../../value-with-confidence';

import { EntityAttributeValueProps } from '../entity-attribute-value.component.types';

export const createClassAttributeValueComponent = (
    props: EntityAttributeValueProps<AttributeObservableEntity.Class>,
    translateService: TranslateService
) => {
    return new ValueWithConfidenceComponent(
        {
            valueContent: translateService.translate(
                IDENTITY_CLASSES.includes(props.value)
                    ? `Entity_IdentityClass_Text_${props.value}`
                    : 'Entity_IdentityClass_TextUnknown'
            ),
            confidence: props.confidence
        },
        translateService
    );
};
