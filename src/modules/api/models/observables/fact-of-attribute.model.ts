import { AttributeObservableEntity } from './attributes.model';

export interface FactOfAttribute<AttributeName extends AttributeObservableEntity, ValueType> {
    attributeName: AttributeName;
    value: ValueType;
    values: {
        confidence: number;
        value: ValueType;
    }[];
    hasConflicts: boolean;
}
