const {resolve} = require('path');
const webpack = require('webpack');
const r = url => resolve(__dirname, url)
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTestPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTestPlugin({
    filename: '[name].wxss'
})

module.exports = {
    devtool: false,
    output: {
        path: r('./dist'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            utils: r('../utils/util')
        }
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                       ['env', {
                         modules: false
                       }]
                    ]
                }
            },
            {
                test: /\.sass$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                        require('autoprefixer') ({
                                            browers: [
                                                'last 2 versions'
                                            ]
                                        })
                                    ]
                                }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                indentedSyntax: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.mina$/,
                loader: 'wechat-mina-loader',
                options: {
                    path: r('../'),
                    dist: './mina'
                }
            }
        ]
    },
     plugins: [
        extractSass,
        new CopyWebpackPlugin([
            {
                from: {
                    glob: 'pages/**/*.json',
                },
                to: '' 
            }
            // , 
            // {
            //     from: 'static',
            //     to: 'static'
            // }
        ]), 
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourcemap: false
        }),
        new ProgressBarPlugin()
    ]
}