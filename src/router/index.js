import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import routes from './routes'

Vue.use(Router)
const router = new Router({
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.length > 1 && !store.getters.loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
