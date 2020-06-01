手写脚手架

1. 新建build/webpack/webpack.config.js

2. 安装react  npm i react react-dom -S

2. package.json 新增scrpits命令     "build": "webpack --config build/webpack.config.js"

3. 搭建es6环境  npm i babel-loader -D   npm i babel-preset-es2015 babel-preset-es2015-loose babel-preset-react -D 新增.babelrc文件