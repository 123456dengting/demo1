
var {terser} = require("rollup-plugin-terser")
var resolve = require("@rollup/plugin-node-resolve")
var commonjs = require("@rollup/plugin-commonjs")
var json = require("@rollup/plugin-json")


module.exports = {
  input: "./index.js",
  output: [
    {
      file: './dist/umd/test.js',
      format: 'umd',
      name: 'TestABC'   
      //当入口文件有export时，'umd'格式必须指定name
      //这样，在通过<script>标签引入时，才能通过name访问到export的内容。
    },
    {
      file: './dist/amd/test.js',
      format: 'amd',
    },
    {
      file: './dist/es/test.js',
      format: 'es'
    },
    {
      file: './dist/cjs/test.js',
      format: 'cjs'
    },
    {
      file: './dist/iife/test.js',
      format: 'iife',
    },
    {
      file: './dist/system/test.js',
      format: 'system',
    }
  ],
  plugins: [
    resolve(),
    json(),
    commonjs({
      include: /node_modules/
    }),
    terser(),
  ],
  external: [],
}