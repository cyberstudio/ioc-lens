module.exports = (StyleDictionary) => {
    StyleDictionary.registerTransform({
        name: 'kbq-attribute/palette-link',
        type: 'attribute',
        matcher: (prop) => prop.name === 'palette',
        transformer: () => ({ palette: true })
    });
};
