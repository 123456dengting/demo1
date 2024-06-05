
var {terser} = require("rollup-plugin-terser")
var resolve = require("@rollup/plugin-node-resolve")
var commonjs = require("@rollup/plugin-commonjs")
var json = require("@rollup/plugin-json")
var hash = require("rollup-plugin-hash")




module.exports = {
  input: "./index.js",
  output: [
    {
      file: './dist/my-lib-umd.[hash].js',
      format: 'umd',
      name: 'JsBridge'   
      //当入口文件有export时，'umd'格式必须指定name
      //这样，在通过<script>标签引入时，才能通过name访问到export的内容。
    },
    // {
    //   file: './dist/my-lib-es.[hash].js',
    //   format: 'es'
    // },
    // {
    //   file: './dist/my-lib-cjs.[hash].js',
    //   format: 'cjs'
    // }
  ],
  plugins: [
    hash({
      target: [{format: "umd", ext: ".js"}],
      // 可选项，默认为8
      hashLength: 8,
      // 可选项，默认为 'sha256'
      hashFunction: 'sha256',
      // 可选项，默认为 'base16'
      hashDigest: 'base16',
      // 可选项，默认为 'hex'
      hashDigestLength: 'hex'
    }),
    commonjs({
      include: /node_modules/
    }),
    // terser(),
    json(),
    resolve(),

  ],
  external: ["lodash"],
}