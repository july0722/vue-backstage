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
    }, {
      path: '/customer/list',
      component: require('../views/customer/List.vue')
    }]
  }, {
    path: '/login',
    component: require('../views/auth/Login.vue')
  }, {
    path: '/logout',
    beforeEnter(to, from, next) {
      store.dispatch('logout')
      next('/')
    }
  }]
})

router.beforeEach((to, from, next) => {
  if (!store.getters.loggedIn && to.path !== '/login') {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

export default router
