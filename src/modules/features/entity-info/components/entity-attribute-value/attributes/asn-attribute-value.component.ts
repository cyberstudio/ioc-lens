import { AttributeObservableEntity } from '../../../../../api/models';
import { TranslateService } from '../../../../../shared/services';
import { formatASN } from '../../../formatters';
import { ValueWithConfidenceComponent } from '../../value-with-confidence';

import { EntityAttributeValueProps } from '../entity-attribute-value.component.types';

export const createASNAttributeValueComponent = (
    props: EntityAttributeValueProps<AttributeObservableEntity.ASN>,
    translateService: TranslateService
) => {
    return new ValueWithConfidenceComponent(
        {
            valueContent: formatASN(props.value),
            confidence: props.confidence
        },
        translateService
    );
};
