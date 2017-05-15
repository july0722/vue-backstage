import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import login from '@/views/auth/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/logout',
    beforeEnter(to, from, next) {
      store.dispatch('logout')
      next('/')
    }
  }, {
    path: '/',
    redirect: '/login'
  }]
})

// router.beforeEach((to, from, next) => {
//   if (!store.getters.loggedIn && to.path !== '/login') {
//     next({
//       path: '/login',
//       query: {
//         redirect: to.fullPath
//       }
//     })
//   } else {
//     next()
//   }
// })

export default router
