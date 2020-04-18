//Основной конфиг, который используется и в дев и в прод режиме
let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //Точка входа
    entry: {
        main: './src/js/main.js'
    },
    //Пути для собранных файлов
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contenthash].js',
        publicPath: ''
    },

    //Оптимизация вебпака из коробки, нужна для уменьшения размеров файлов
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },

    //Лоадеры для конкретных типов файлов
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: "babel-loader",
                query: {
                    presets: ['@babel/preset-env']
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "file-loader",
                query: {
                    name: '../img/[name].[ext]',
                    emitFile: false,
                    publicPath: function (url) {
                        return url.replace(/dist/, '')
                    }
                }
            }
        ]
    },
    //Плагины для обработнки файлов, путей етс
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
