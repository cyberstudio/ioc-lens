module.exports = (StyleDictionary) => {
    const themes = ['light-color-scheme', 'dark-color-scheme'];

    StyleDictionary.registerTransform({
        name: 'kbq-attribute/abstract-color',
        type: 'attribute',
        matcher: (prop) => {
            return themes.includes(prop.attributes.category) && !prop.path.includes('neutral');
        },
        transformer: () => ({ abstractColor: true })
    });
};
