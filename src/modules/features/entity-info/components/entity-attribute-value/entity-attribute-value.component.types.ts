import { AttributeObservableEntity, AttributeValueType } from '../../../../api/models';

export interface EntityAttributeValueProps<A extends AttributeObservableEntity | string = AttributeObservableEntity> {
    attributeName: A | string;
    value: AttributeValueType<A>;
    confidence: number | null;
}

export const isEntityAttributeValueProps = <A extends AttributeObservableEntity | string>(
    attributeName: A,
    p: EntityAttributeValueProps<AttributeObservableEntity | string>
): p is EntityAttributeValueProps<A> => {
    return p.attributeName === attributeName;
};
