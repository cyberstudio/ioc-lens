import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import transform from 'lodash/transform';

import { EmptyObject } from '../types';

export const getObjectDiff = (object: object, base: object) => {
    function changes(object: object, base: object) {
        return transform(object, (result: EmptyObject, value: unknown, key) => {
            if (!isEqual(value, base[key])) {
                result[key] = isObject(value) && isObject(base[key]) ? changes(value, base[key]) : value;
            }
        });
    }

    return changes(object, base);
};
