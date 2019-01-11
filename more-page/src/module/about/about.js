import Vue from 'vue';
import App from './App';
import router from '@/router/about-route'



import iview from 'iview';
import '@/assets/theme/index.less';
Vue.use(iview)

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: {
    App,
  }
})



