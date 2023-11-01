const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const helpers = require('./helpers');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: helpers.root('dist/extension')
    }
});
