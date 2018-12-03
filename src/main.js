import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import * as filters from './filters'
import promiseFinally from 'promise.prototype.finally'
import '@/plugins/element-ui'

Vue.config.productionTip = false
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
promiseFinally.shim()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
