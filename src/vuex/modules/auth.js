import * as types from '../mutation-types'

const state = {
  user: null,

}

const mutations = {
  [types.AUTH_LOGIN](state, user) {
    state.user = user
  },
  [types.AUTH_LOGOUT](state) {
    state.user = null
  }
}

export default {
  state,
  mutations
}
