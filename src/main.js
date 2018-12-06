import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import * as filters from './filters'
import promiseFinally from 'promise.prototype.finally'
import _ from './plugins/lodash'
import axios from './plugins/axios'
import '@/plugins/element-ui'

Vue.config.productionTip = false
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Object.defineProperty(Vue.prototype, '$_', {
  value: _
})
Object.defineProperty(Vue.prototype, '$http', {
  value: axios
})
promiseFinally.shim()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
