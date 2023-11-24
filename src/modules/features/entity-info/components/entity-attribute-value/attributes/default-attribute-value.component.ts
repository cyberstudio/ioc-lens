import {
    AttributeObservableEntity,
    DictionaryItemBrief,
    ObservableEntityAttributeByFormat,
    isDictionaryItemAttributeValue,
    isNumberAttributeValue
} from '../../../../../api/models';
import { TranslateService } from '../../../../../shared/services';
import { ValueWithConfidenceComponent } from '../../value-with-confidence';

import { EntityAttributeValueProps } from '../entity-attribute-value.component.types';
import { createDictionaryItemAttributeValueComponent } from './dictionary-item-attribute-value.component';

export const createDefaultAttributeValueComponent = (
    props: EntityAttributeValueProps<AttributeObservableEntity | string>,
    translateService: TranslateService
) => {
    if (isDictionaryItemAttributeValue(props.value)) {
        return createDictionaryItemAttributeValueComponent(
            props as EntityAttributeValueProps<ObservableEntityAttributeByFormat<DictionaryItemBrief>>,
            translateService
        );
    }

    if (isNumberAttributeValue(props.value)) {
        return new ValueWithConfidenceComponent(
            {
                valueContent: translateService.translateNumber(props.value),
                confidence: props.confidence
            },
            translateService
        );
    }

    return new ValueWithConfidenceComponent(
        {
            valueContent: (props.value || '').toString(),
            confidence: props.confidence
        },
        translateService
    );
};
