import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: layout,
      children: [
        {
          path: '/dashboard',
          component: () =>
            import(/* webpackChunkName: "login" */ '@/views/dashboard')
        },
        {
          path: '/sys/user',
          component: () =>
            import(/* webpackChunkName: "login" */ '@/views/system/user')
        }
      ]
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login')
    }
  ]
})
