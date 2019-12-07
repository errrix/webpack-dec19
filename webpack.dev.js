//Дополнительная часть конфига для процесса разработки
const webpack =  require('webpack');
let path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseWebpackConfig = require('./webpack.config');

const devWebpackConfig = merge(baseWebpackConfig, {
    //Объявляем режим - разработка или продакшн
    mode: 'development',
    //Указываем, какие соурсмапы нам нужны
    devtool: 'cheap-module-eval-source-map',

    //Доополнительная настройка для корректной работы девсервера
    output: {
        publicPath: '/'
    },

    //Настройки лайф девсервера
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

    //Лоадер для обработки цсс с созданием сорсмап
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
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
});