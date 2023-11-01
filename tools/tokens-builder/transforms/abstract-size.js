module.exports = (StyleDictionary) => {
    // eslint-disable-next-line prettier/prettier
    const sizes = [
        '3xs',
        'xxs',
        'xs',
        's',
        'm',
        'l',
        'xl',
        'xxl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl'
    ];

    StyleDictionary.registerTransform({
        name: 'kbq-attribute/abstract-size',
        type: 'attribute',
        matcher: (prop) => prop.attributes.category === 'size' && sizes.includes(prop.name),
        transformer: () => ({ abstractSize: true })
    });
};
