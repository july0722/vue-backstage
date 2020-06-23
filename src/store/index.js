import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import app from './modules/app'
import auth from './modules/auth'

Vue.use(Vuex)

const plugin = store => {
  const flag = 'backstage'
  const storage = window.sessionStorage
  for (let i = 0, length = storage.length; i < length; i++) {
    if (storage.key(i).indexOf(flag) === 0) {
      const _keys = storage.key(i).split('_')
      _keys.shift()
      store.state[_keys.shift()][_keys.join('_')] = JSON.parse(
        storage.getItem(storage.key(i))
      )
    }
  }
  store.subscribe(mutation => {
    mutation.type.indexOf('RECORD') === 0 &&
      storage.setItem(
        mutation.type.replace('RECORD', flag).toLowerCase(),
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
