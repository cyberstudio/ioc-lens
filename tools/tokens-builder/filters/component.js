module.exports = (StyleDictionary) => {
    StyleDictionary.registerFilter({
        name: 'component',
        matcher: (prop) => prop.attributes.component && !prop.path.includes('font')
    });
};
