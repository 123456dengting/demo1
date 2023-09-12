const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');


const mode =  'prod' ? 'production' : 'development'

module.exports = { 
    mode: mode,
    entry: {
        sum: './src/js/sum.js',
        str: './src/js/str.js',
        main: './src/js/main.js'
    },
    output: { 
                filename: '[name]-[fullhash].js',
                path: __dirname + '/dist',
                clean: true 
            }, 
            module: {
                rules: [
                    {
                        test: /\.less$/,
                        use: [{
                          loader: "style-loader"
                        }, {
                          loader: "css-loader"
                        }, {
                          loader: "less-loader"
                        }]
                    }
                ]
            }

}