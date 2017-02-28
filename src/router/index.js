import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'
import Hello from '@/components/Hello'

Vue.use(VueRouter)
// { path: '/', component: require('./views/\/index') },
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    }
  ]
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
