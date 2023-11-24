import { AttributeObservableEntity } from '../../../../../api/models';
import { TranslateService } from '../../../../../shared/services';
import { ValueWithConfidenceComponent } from '../../value-with-confidence';

import { EntityAttributeValueProps } from '../entity-attribute-value.component.types';

import './potential-damage-attribute-value.component.css';

export const createPotentialDamageAttributeValueComponent = (
    props: EntityAttributeValueProps<AttributeObservableEntity.PotentialDamage>,
    translateService: TranslateService
) => {
    const valueElement = document.createElement('span');

    valueElement.classList.add('kbq-potential-damage-attribute-value');
    valueElement.classList.add(`kbq-potential-damage-attribute-value--${props.value.toLowerCase()}`);

    valueElement.textContent = translateService.translate(`Entity_PotentialDamage_Text_${props.value}`);

    return new ValueWithConfidenceComponent(
        {
            valueContent: valueElement,
            confidence: props.confidence
        },
        translateService
    );
};
