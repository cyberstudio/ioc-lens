const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const helpers = require('./helpers');

module.exports = {
    entry: {
        content: './src/apps/extension/content.ts',
        background: './src/apps/extension/background.ts',
        popup: './src/apps/extension/popup.ts',
        options: './src/apps/extension/options.ts'
    },
    output: {
        filename: '[name].js',
        path: helpers.root('dist/extension')
    },
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
                    'css-loader',
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
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash].[ext]'
                }
            }
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
            patterns: [{ from: helpers.root('src/apps/extension/assets') }]
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: helpers.root('src/modules/shared/resources/images'),
                    to: 'images'
                }
            ]
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: helpers.root('src/modules/shared/resources/_locales'),
                    to: '_locales'
                }
            ]
        })
    ]
};
