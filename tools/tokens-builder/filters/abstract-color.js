module.exports = (StyleDictionary) => {
    StyleDictionary.registerFilter({
        name: 'abstract-color',
        matcher: (prop) => prop.attributes.abstractColor && !prop.attributes.palette
    });
};
