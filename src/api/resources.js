import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.root = '/api'
Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push((request, next) => {

  next((response) => {
    response.data = JSON.parse(response.data)
  })
})

export const AuthResource = Vue.resource('auth{/action}')
