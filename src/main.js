import Vue from 'vue'
import Element from 'element-ui'
import App from './App.vue'
import store from './vuex/store'
import router from './router'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'

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
