import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
import { loggedIn } from '../vuex/getters'

Vue.use(VueRouter)

const router = new VueRouter({
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
  }, {
    path: '/logout',
    beforeEnter(route, redirect) {
      auth.logout()
      redirect('/')
    }
  }]
})

router.beforeEach((route, redirect, next) => {
 //  if (!auth.loggedIn()) {
 //   redirect({
 //     path: '/login',
 //     query: { redirect: route.fullPath }
 //   })
 // } else {
 //   next()
 // }
  next()
})

export default router
