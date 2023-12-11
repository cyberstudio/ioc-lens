const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const helpers = require('./helpers');
const common = require('../common');

module.exports = {
    mode: 'development',

    entry: {
        main: './src/apps/ui-book/main.ts'
    },

    output: {
        filename: '[name].js',
        path: helpers.root('dist/ui-book')
    },

    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [['postcss-nesting', {}]]
                            }
                        }
                    }
                ]
            },
            { test: /\.json$/, type: 'json' }
        ]
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        }),
        new CopyPlugin({
            patterns: [{ from: helpers.root('src/apps/ui-book/assets') }]
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: helpers.root('src/modules/design-system/fonts/inter/*.woff2'),
                    to: 'fonts/[name][ext]'
                }
            ]
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: helpers.root('src/modules/shared/resources/images'),
                    to: 'images'
                }
            ]
        }),
        common.createExtensionOriginReplacer('..')
    ],

    devServer: {
        static: helpers.root('dist/ui-book'),
        port: 9000
    }
};
