const StyleDictionary = require('style-dictionary');

const tokensPath = './node_modules/@koobiq/design-tokens/web/tokens';
const overridesTokensPath = './src/modules/design-system/tokens';

const getPropertiesSources = (properties = ['*'], path = tokensPath) =>
    properties.map((p) => `${path}/properties/${p}.json5`);

const getComponentsSources = (components = ['*'], path = tokensPath) =>
    components.map((c) => `${path}/components/${c}.json5`);

const requiredComponents = [
    'alert',
    'badge',
    'button',
    'divider',
    'form-field',
    'input',
    'modal',
    'progress-spinner',
    'toggle',
    'tooltip'
];

// ==== Include custom transforms ====
require('./transforms/abstract-size')(StyleDictionary);
require('./transforms/abstract-color')(StyleDictionary);
require('./transforms/palette-link')(StyleDictionary);
require('./transforms/component')(StyleDictionary, requiredComponents);

// ==== Include custom filters ====
require('./filters/abstract-size')(StyleDictionary);
require('./filters/abstract-color')(StyleDictionary);
require('./filters/typography')(StyleDictionary);
require('./filters/component')(StyleDictionary);

// ==== Include custom formats ====
require('./formats/typography')(StyleDictionary);

const myStyleDictionary = StyleDictionary.extend({
    source: [
        ...getPropertiesSources(),
        ...getPropertiesSources(['*'], overridesTokensPath),
        ...getComponentsSources(requiredComponents)
    ],
    platforms: {
        css: {
            transforms: [
                'attribute/cti',
                'kbq-attribute/palette-link',
                'kbq-attribute/abstract-size',
                'kbq-attribute/abstract-color',
                'kbq-attribute/component',
                'name/cti/kebab',
                'time/seconds',
                'content/icon',
                'size/px',
                'color/css'
            ],
            prefix: 'kbq',
            buildPath: 'src/modules/design-system/',
            files: [
                {
                    destination: 'sizes.css',
                    format: 'css/variables',
                    filter: 'abstract-size'
                },
                {
                    destination: 'colors.css',
                    format: 'css/variables',
                    filter: 'abstract-color'
                },
                {
                    destination: 'typography.css',
                    format: 'kbq-css/typography',
                    filter: 'typography'
                },
                {
                    destination: 'components.css',
                    format: 'css/variables',
                    filter: 'component'
                }
            ]
        }
    }
});

myStyleDictionary.buildAllPlatforms();
