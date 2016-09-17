import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.root = '/api'
Vue.http.interceptors.push((request, next) => {

  next((response) => {

  })
})

export const AuthResource = Vue.resource('auth{/action}')
