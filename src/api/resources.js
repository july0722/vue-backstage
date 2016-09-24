import Vue from 'vue'
import VueResource from 'vue-resource'
import NProgress from 'nprogress'

Vue.use(VueResource)

Vue.http.options.root = '/api'
Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true

NProgress.configure({
  showSpinner: false
})

Vue.http.interceptors.push((request, next) => {
  NProgress.start()
  next((response) => {
    response.data = JSON.parse(response.data)
    NProgress.done()
  })
})

export const AuthResource = Vue.resource('auth{/action}')
