const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
    //应用入口
    entry: {
        app: path.join(__dirname, '../module/index.js')
    },

    //打包的文件路径
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        //静态资源输出路径
        publicPath: ''
    },

    //用于识别jsx
    module: {
        rules: [
            {
                test: /.jsx$/,//正则表达式
                loader: 'babel-loader'
            },
            {
                test: /.js$/,//正则表达式
                exclude: path.join(__dirname, '../node_modules'),
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        //生成一个html文件，同时注入entry
        new HTMLPlugin()
    ]
}