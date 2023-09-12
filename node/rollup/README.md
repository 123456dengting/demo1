# rollup打包

## 1.安装
    npm i rollup -D

## 简单使用
    1. 在script下添加"dev": "rollup -i src/index.js -o dist/bundle.js -f es"
    2. 执行npm run dev
    说明
- -i指定要打包的文件，-i是--input的缩写。
- src/index.js是-i的参数，即打包入口文件。
- -o指定输出的文件，是--output.file或--file的缩写。(如果没有这个参数，则直接输出到控制台)
- dist/bundle.js是-o的参数，即输出文件。
- -f指定打包文件的格式，-f是--format的缩写。
- es是-f的参数，表示打包文件使用ES6模块规范。


    rollup支持的打包文件的格式有amd, cjs, es\esm, iife, umd。其中，amd为AMD标准，cjs为CommonJS标准，esm\es为ES模块标准，iife为立即调用函数， umd同时支持amd、cjs和iife。

##  配置文件使用
    正常项目开发都是使用配置文件,简化操作命令,还嫩使用更多的rollup高级特性

    1. 在项目根目录下创建rollup.config.js, 
- 这里最好是使用module.exports导出大部分不支持es6写法
- output 可以使数组或者对象可以支持一个入口文件,打不同的输出文件对比差异

```javascript
    module.exports = {
    input: "./index.js",
    output: [
        {
        file: './dist/my-lib-umd.js',
        format: 'umd',
        name: 'hello'   
        //当入口文件有export时，'umd'格式必须指定name
        //这样，在通过<script>标签引入时，才能通过name访问到export的内容。
        },
        {
        file: './dist/my-lib-es.js',
        format: 'es'
        },
        {
        file: './dist/my-lib-cjs.js',
        format: 'cjs'
        }
    ],
}

```
    2. 修改package.json的script字段

```json
{
    "scripts": {
        "dev": "rollup -c",                 // 默认使用rollup.config.js
        "dev": "rollup -c my.config.js"    //使用自定义的配置文件，my.config.js
    }
}
```


## 插件使用
在webpack中使用loader对源文件进行预处理,plugin完成构建打包的特定功能需求rollup中plugin兼容webpack中的loader和plugin的功能

1. 常用插件 安装示例  npm install @rollup/plugin-node-resolve --save-dev

-  @rollup/plugin-node-resolve 插件允许我们加载第三方模块

-  @rollup/plugin-commonjs 插件将它们转换为ES6版本

-  @rollup/plugin-json 支持导入json，没有 json 插件的支持我们在导入 json 文件时会报错


使用示例

```javascript

    module.exports =  {
  input:'./src/main.js', // 入口
  output: {
    file:'./dist/bundle.js', // 出口
    format: 'es',
  },
  plugins: [
    commonjs({
      include: /node_modules/
    }),
    json(),
    resolve()
  ],
}

```