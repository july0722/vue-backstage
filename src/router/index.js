import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
import {
  loggedIn
} from '../vuex/getters'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '/',
    redirect: '/login',
    component: require('../views/Layout.vue'),
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
  if (!loggedIn(store.state) && route.path !== '/login') {
    redirect({
      path: '/login',
      query: {
        redirect: route.fullPath
      }
    })
  } else {
    next()
  }
})

export default router
