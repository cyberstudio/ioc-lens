module.exports = (StyleDictionary) => {
    StyleDictionary.registerFilter({
        name: 'typography',
        matcher: (prop) => {
            return prop.attributes.category === 'typography' && !prop.attributes.type.includes('mono');
        }
    });
};
