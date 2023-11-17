export const formatConfidence = (value: number, locale: 'ru-RU' | 'en-US' | string): string => {
    if (value === 0) {
        return '0';
    }

    const confidenceRoundFactor = 10;
    const accuracy = 1;
    const factor = confidenceRoundFactor ** accuracy;
    const roundedConfidence = Math.round(value * factor) / factor;

    if (roundedConfidence === 0) {
        const zeros = '0'.repeat(accuracy);
        const separator = locale.includes('ru') ? ',' : '.';

        return `~ 0${separator}${zeros}`;
    }

    return roundedConfidence.toLocaleString(locale);
};
