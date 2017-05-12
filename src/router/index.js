import Vue from 'vue'
import Router from 'vue-router'
import hello from '@/components/hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: hello
    }
  ]
})
