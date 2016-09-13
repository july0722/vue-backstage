import Vue from 'vue'
import Element from 'element-ui'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'
// import 'element-ui/lib/theme-default/index.css'

Vue.use(Element)

sync(store, router)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
