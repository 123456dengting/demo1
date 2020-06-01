import Vue from 'vue'
import Router from 'vue-router'
import about from '@/module/about/views/index';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'about',
      component: about
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
  ]
})