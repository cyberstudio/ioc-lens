const groupBy = require('lodash/groupBy');

const header = `
/**
 * Do not edit directly
 * Generated on ${new Date().toUTCString()}
 */
`.trim();

/**
 *
 * @param {{ value: any; item: string }[]} props
 * @returns {String}
 */
const buildCSSClassProperties = (props) =>
    props
        .filter((p) => p.value !== 'null')
        .map((p) => `    ${p.attributes.item}: ${p.value};`)
        .join('\n');

module.exports = (StyleDictionary) => {
    StyleDictionary.registerFormat({
        name: 'kbq-css/typography',
        formatter: (dictionary) => {
            const fonts = Object.entries(groupBy(dictionary.allProperties, (p) => p.attributes.type));

            const typographyClasses = fonts
                .map(([name, props]) => {
                    return `.${name} {\n${buildCSSClassProperties(props)}\n}`;
                })
                .join('\n\n');

            return `${header}\n\n${typographyClasses}`;
        }
    });
};
