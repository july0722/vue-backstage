import * as types from '../mutation-types'

const state = {
  user: sessionStorage.getItem('backstage_auth_user'),

}

const mutations = {
  [types.AUTH_LOGIN](state, user) {
    state.user = user
    sessionStorage.setItem('backstage_auth_user',user)
  },
  [types.AUTH_LOGOUT](state) {
    state.user = null
    sessionStorage.setItem('backstage_auth_user',null)
  }
}

export default {
  state,
  mutations
}
