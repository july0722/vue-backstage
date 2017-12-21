import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import app from './modules/app'
import auth from './modules/auth'

Vue.use(Vuex)

const plugin = store => {
  let storage = window.sessionStorage
  for (let i = 0, length = storage.length; i < length; i++) {
    if (storage.key(i).indexOf('backstage') === 0) {
      let _keys = storage.key(i).split('_')
      _keys.shift()
      store.state[_keys.shift()][_keys.join('_')] = JSON.parse(
        storage.getItem(storage.key(i))
      )
    }
  }
  store.subscribe((mutation, state) => {
    mutation.type.indexOf('RECORD') === 0 &&
      storage.setItem(
        mutation.type.replace('RECORD', 'backstage').toLowerCase(),
        JSON.stringify(mutation.payload)
      )
  })
}

export default new Vuex.Store({
  getters,
  actions,
  modules: {
    app,
    auth
  },
  plugins: [plugin]
})
