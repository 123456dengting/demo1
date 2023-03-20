// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



let obj1 = {
  name: '张三',
  age: '14'
}

let obj2 = {
  name: '张三1',
  age: '141',
  sex: '12'
}

let newObj = Object.assign({}, obj1, obj2)
newObj.name = 'list'
console.log('newObj', newObj)

// let obj3 = {...obj1, ...obj2}
// obj3.name = 'jhlkjlk'
// console.log('newObj3', obj3)

console.log('obj1', obj1)
console.log('obj2', obj2)


let url = 'name=zhangsan&age=20';

var getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}

let str = '112233<img 6545464>65465'
let regss = /<img(.*?)>/ig;

console.log('123', str.match(regss))

let regUrl = new RegExp("(^|&)age=(.*?)(&|$)")
console.log('456', url.match(regUrl))

