import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '/',
    component: require('../views/Layout.vue'),
    redirect: '/login',
    children: [{
      path: '/dashboard',
      component: require('../views/Dashboard.vue')
    }]
  }, {
    path: '/login',
    component: require('../views/Login.vue')
  }]
})
