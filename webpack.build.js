//Дополнительная часть конфига для процесса сборки продакшена
let path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseWebpackConfig = require('./webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',

    output: {
        publicPath: ''
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {from:'src/img',to:'img'},
            // {from:'src/index.html',to: ''}
        ])
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig)
});