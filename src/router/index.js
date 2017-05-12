import Vue from 'vue'
import VueRouter from 'vue-router'
import hello from '@/components/hello'

Vue.use(VueRouter)
// { path: '/', component: require('./views/\/index') },
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: hello
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
