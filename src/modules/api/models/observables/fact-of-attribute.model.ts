import { AttributeObservableEntity } from './attributes.model';

export interface FactOfAttribute<AttributeName extends AttributeObservableEntity, ValueType> {
    attributeName: AttributeName | string;
    value: ValueType | null;
    values: {
        confidence: number;
        value: ValueType;
    }[];
    hasConflicts: boolean;
}
