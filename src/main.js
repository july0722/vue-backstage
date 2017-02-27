// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import App from './App'
import router from './router'
import store from './store'
import {
  sync
} from 'vuex-router-sync'

Vue.config.productionTip = false

Vue.use(Element)

sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
})
