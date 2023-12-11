import { Result } from '@badrap/result';

export type ResultDTO<V> = { type: 'Error'; errorName: string } | { type: 'Ok'; value: V };

export const mapResultToDTO = <T>(r: Result<T>): ResultDTO<T> => {
    if (r.isErr) {
        return { type: 'Error', errorName: r.error.name };
    }

    return { type: 'Ok', value: r.value };
};

export const resultFromDTO = <T>(r: ResultDTO<T>): Result<T> => {
    if (r.type === 'Error') {
        const error = new Error(r.errorName);
        error.name = r.errorName;

        return Result.err(error);
    }

    return Result.ok(r.value);
};
