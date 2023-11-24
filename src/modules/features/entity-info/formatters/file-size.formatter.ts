export const FileSizeUnit = Object.freeze({
    B: 'B',
    KB: 'KB',
    MB: 'MB',
    GB: 'GB',
    TB: 'TB'
});

export type FileSizeUnit = keyof typeof FileSizeUnit;

const units = Object.values(FileSizeUnit) as FileSizeUnit[];

export interface FileSize {
    value: number;
    unit: FileSizeUnit;
}

export const formatBytesToFileSize = (bytes: number): FileSize => {
    const unit = findMaxFileSizeUnit(bytes);

    return {
        unit,
        value: bytes / getMinBytesOfFileSizeUnit(unit)
    };
};

const findMaxFileSizeUnit = (bytes: number): FileSizeUnit => {
    let result: FileSizeUnit = FileSizeUnit.B;

    if (bytes === 0) {
        return result;
    }

    const sortedRanges = units;

    for (const unit of sortedRanges) {
        const unitIndex = sortedRanges.findIndex((u) => u === unit);

        const currentUnit = sortedRanges[unitIndex];
        const nextUnit = sortedRanges[unitIndex + 1];

        const minCurrentUnitValue = getMinBytesOfFileSizeUnit(currentUnit);
        const minNextUnitValue = getMinBytesOfFileSizeUnit(nextUnit);

        const isValueInCurrentUnitRange = bytes >= minCurrentUnitValue && bytes < minNextUnitValue;

        if (isValueInCurrentUnitRange || !nextUnit) {
            result = currentUnit;

            break;
        }
    }

    return result;
};

const getFileSizeUnitIndex = (unit: FileSizeUnit): number => units.findIndex((u) => u === unit);

const COUNT_OF_BYTES_IN_NEXT_RANK = 1000;

const getMinBytesOfFileSizeUnit = (unit: FileSizeUnit): number => {
    const unitIndex = getFileSizeUnitIndex(unit);

    return Math.pow(COUNT_OF_BYTES_IN_NEXT_RANK, unitIndex);
};
