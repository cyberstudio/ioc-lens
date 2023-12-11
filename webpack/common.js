const { ModifySourcePlugin, ReplaceOperation } = require('modify-source-webpack-plugin');

const EXTENSION_ORIGIN = '__EXTENSION__ORIGIN__';

exports.createExtensionOriginReplacer = (destinationOrigin) => {
    return new ModifySourcePlugin({
        rules: [
            {
                test: /\.(css)$/,
                operations: [new ReplaceOperation('all', EXTENSION_ORIGIN, destinationOrigin)]
            }
        ]
    });
};
