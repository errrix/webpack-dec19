const webpack =  require('webpack');
let path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseWebpackConfig = require('./webpack.config');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',

    output: {
        publicPath: '/'
    },

    devServer: {
        overlay: true,
        publicPath: '',
        contentBase: path.join(__dirname, 'src/'),
        watchContentBase: true,
        historyApiFallback: {
            disableDotRule: true
        },
        host: "localhost",
        port: 3100
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
                    'css-loader?sourceMap',
                    'sass-loader?sourceMap',
                ],
            },
        ]
    },


    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
})

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
})