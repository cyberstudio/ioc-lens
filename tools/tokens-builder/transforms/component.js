module.exports = (StyleDictionary, components) => {
    StyleDictionary.registerTransform({
        name: 'kbq-attribute/component',
        type: 'attribute',
        matcher: (prop) =>
            components.includes(prop.attributes.category) && (prop.filePath || '').includes('components'),
        transformer: () => ({ component: true })
    });
};
