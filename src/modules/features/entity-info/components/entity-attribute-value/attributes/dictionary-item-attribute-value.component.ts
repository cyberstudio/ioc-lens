import { ObservableEntityAttributeByFormat, DictionaryItemBrief } from '../../../../../api/models';
import { TranslateService } from '../../../../../shared/services';
import { formatDictionaryItem } from '../../../formatters';
import { ValueWithConfidenceComponent } from '../../value-with-confidence';

import { EntityAttributeValueProps } from '../entity-attribute-value.component.types';

export const createDictionaryItemAttributeValueComponent = (
    props: EntityAttributeValueProps<ObservableEntityAttributeByFormat<DictionaryItemBrief>>,
    translateService: TranslateService
) => {
    return new ValueWithConfidenceComponent(
        {
            valueContent: formatDictionaryItem(props.value),
            confidence: props.confidence
        },
        translateService
    );
};
