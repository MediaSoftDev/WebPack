const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')


const path = require('path')
const webpack = require('webpack')


const isProd = process.env.NODE_ENV === "production"
const cssDev = ['style-loader','css-loader?sourceMap','sass-loader']
const cssProd = ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '/dist'
                })
const cssConfig = isProd ? cssProd : cssDev

module.exports = {
    entry: {
        app: './src/app.js',
        //contact: './src/contact.js'        
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                //use: 'file-loader?name=[hash:6].[ext]&outputPath=img/'
                use: [
                    //'file-loader?name=[name].[ext]&outputPath=img/&publicPath=img/',
                    'file-loader?name=img/[name].[ext]',
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(woff2?|svg)$/,
                use: 'url-loader?limit=10000'
            },
            {
                test: /\.(ttf?|eot)$/,
                use: 'file-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        stats: 'errors-only',
        hot: true,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            //excludeChunks: ['contact'],
            template: './src/index.html'
        }),
        /*new HtmlWebpackPlugin({
            title: 'Contact Page',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['contact'],
            filename: 'contact.html',
            template: './src/contact.html'
        }),*/
        new ExtractTextWebpackPlugin({
            filename: 'css/app.css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}