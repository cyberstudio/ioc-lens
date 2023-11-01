module.exports = (StyleDictionary) => {
    StyleDictionary.registerFilter({
        name: 'abstract-size',
        matcher: (prop) => prop.attributes.abstractSize
    });
};
