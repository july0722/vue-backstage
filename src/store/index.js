import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0
}

const mutations = {
  INCREMENT(state) {
    state.count++
  },
}

const actions = {
  INCREMENT({ commit }) {
    commit('INCREMENT')
  },
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
