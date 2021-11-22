const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/app.js'),
    },
    output:
    {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../build')
    },
    devtool: 'source-map',
    plugins:
    [
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: path.resolve(__dirname, '../static'), to: path.resolve(__dirname,'../build/assets') }
        //     ]
        // }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            chunks: ['app'],
            minify: true
        }),
        new MiniCSSExtractPlugin({
            filename: 'style.css'
        })
    ],
    module:
    {
        rules:
        [
            // HTML
            {
                test: /\.html$/,
                use: ['html-loader']
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use:
                [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },

            // SCSS
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    }
}
