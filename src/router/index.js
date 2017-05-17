import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import main from '@/views/main'
import dashboard from '@/views/auth/dashboard'
import error from '@/views/auth/error'
import login from '@/views/auth/login'
import password from '@/views/auth/password'

import user from '@/views/system/user'

Vue.use(VueRouter)

const router = new VueRouter()

const whitelist = ['/login', '/error']
router.beforeEach((to, from, next) => {
  if (store.getters.loggedIn) {
    next()
  } else {
    if (whitelist.includes(to.path)) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
})

router.addRoutes([{
  path: '*',
  redirect: '/error'
}, {
  path: '/error',
  component: error
}, {
  path: '/login',
  component: login
}, {
  path: '/logout',
  beforeEnter(to, from, next) {
    store.dispatch('logout')
    next('/')
  }
}, {
  path: '/',
  redirect: '/login',
  component: main,
  children: [{
    path: '/dashboard',
    component: dashboard
  }, {
    path: '/password',
    component: password
  }, {
    path: '/user',
    component: user
  }]
}])

export default router
