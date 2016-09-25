import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '/',
    redirect: '/login',
    component: require('../views/Main.vue'),
    children: [{
      path: '/dashboard',
      component: require('../views/Dashboard.vue')
    }, {
      path: '/password',
      component: require('../views/auth/Password.vue')
    }, ]
  }, {
    path: '/login',
    component: require('../views/auth/Login.vue')
  }, {
    path: '/logout',
    beforeEnter(route, redirect) {
      store.dispatch('logout')
      redirect('/')
    }
  }]
})

router.beforeEach((route, redirect, next) => {
  if (!store.getters.loggedIn && route.path !== '/login') {
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
