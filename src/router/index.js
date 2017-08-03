import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store'

import main from '@/views/main'
import dashboard from '@/views/auth/dashboard'
import error from '@/views/auth/error'
import login from '@/views/auth/login'
import password from '@/views/auth/password'

const user = () => import('@/views/system/user')
const userEditor = () => import('@/views/system/user/editor')

Vue.use(VueRouter)
NProgress.configure({
  showSpinner: false
})
const router = new VueRouter()

const loginWhitelist = ['/login', '/error']
const permissionWhitelist = ['/logout', '/password', '/dashboard'].concat(loginWhitelist)
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.loggedIn) {
    let _path = to.path
    to.matched[1] && (_path = to.matched[1].path.split('/:')[0])
    if (permissionWhitelist.includes(_path) || store.getters.currentPermissions.some(p => p.children.some(c => c.path === _path))) {
      next()
    } else {
      next('/error')
    }
  } else {
    if (loginWhitelist.includes(to.path)) {
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

router.afterEach(() => {
  NProgress.done()
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
    name: '修改密码',
    path: '/password',
    component: password
  }, {
    path: '/user',
    component: user
  }, {
    path: '/user/:id',
    component: userEditor
  }]
}])

export default router
