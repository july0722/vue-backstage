import * as types from '../mutation-types'

const state = {
  user: JSON.parse(sessionStorage.getItem('backstage_auth_user')),

}

const mutations = {
  [types.AUTH_LOGIN](state, user) {
    state.user = user
    sessionStorage.setItem('backstage_auth_user', JSON.stringify(user))
  },
  [types.AUTH_LOGOUT](state) {
    state.user = null
    sessionStorage.removeItem('backstage_auth_user')
  }
}

export default {
  state,
  mutations
}
