import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import * as filters from './filters'
import _ from './plugins/lodash'
import axios from './plugins/axios'
import '@/plugins/element-ui'
import App from './App.vue'

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
