let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/main.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: ''
    },

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
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        // new HtmlWebpackPlugin({
        //     filename: 'contact.html',
        //     template: 'src/contact.html'
        // })
    ]
};
