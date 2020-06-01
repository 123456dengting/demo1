# 改版EDS

> SRC目录简介

```bash
src

---- assets                     公用工具            
-------- fonts                  字体
-------- images                 图片
-------- theme                  主题
-------- util                   工具类

---- components                 公用组件

---- module                     模块
-------- login                  举例：登录模块
------------ CSS
------------ JS
------------ components
------------ ivews
------------ App.vue
------------ login.html
------------ login.js

---- router                     路由

---- vuex                       vuex
```



> Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build   (config/index.js/build.assetsPublicPath = "项目相对于host的地址")

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

