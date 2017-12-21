import * as types from '../mutation-types'

const state = {
  sidebar: {
    collapse: false
  }
}

const getters = {}

const actions = {}

const mutations = {
  [types.RECORD_APP_SIDEBAR_COLLAPSE](state, collapse) {
    state.collapse = collapse
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
