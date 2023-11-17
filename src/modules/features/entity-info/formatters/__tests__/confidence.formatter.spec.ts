import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { formatConfidence } from '../confidence.formatter';

test('should round confidence to 1 decimal number', () => {
    const testCases = [
        { source: 0, expected: '0' },
        { source: 0.04, expected: '~ 0.0' },
        { source: 0.05, expected: '0.1' },
        { source: 0.15, expected: '0.2' },
        { source: 0.5, expected: '0.5' },
        { source: 1, expected: '1' }
    ];

    testCases.forEach(({ source, expected }) => {
        assert.equal(formatConfidence(source, 'en-US'), expected);
    });
});

test('should use a comma for decimal point for RU locale', () => {
    assert.equal(formatConfidence(0.01, 'ru-RU'), '~ 0,0');
});

test('should use a dot for decimal point for EN locale', () => {
    assert.equal(formatConfidence(0.01, 'en-US'), '~ 0.0');
});

test.run();
