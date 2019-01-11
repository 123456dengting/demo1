import Vue from 'vue'
import Router from 'vue-router'
import home from '@/module/home/views/index';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
  ]
})