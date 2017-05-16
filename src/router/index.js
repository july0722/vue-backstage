import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import main from '@/views/main'
import error from '@/views/auth/error'
import login from '@/views/auth/login'
import password from '@/views/auth/password'

Vue.use(VueRouter)

const router = new VueRouter()

const whiteList = ['/login', '/error']
router.beforeEach((to, from, next) => {
  if (store.getters.loggedIn) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
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
    path: '/password',
    name: 'password',
    component: password
  }]
}])

export default router
