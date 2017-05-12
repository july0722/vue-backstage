import * as types from '../mutation-types'
import auth from '@/api/auth'

const state = {
  user: {},
  menu: []
}

const getters = {
  currentUser: state => state.user,
  currentMenu: state => state.permlist,
  loggedIn: state => !!state.user.id
}

const actions = {
  login: async({commit, state}, payload) => {
    const response = await auth.login(payload)
    if (response.successful) {
      commit(types.RECORD_AUTH_USER, response.data.user)
      commit(types.RECORD_AUTH_MENU, response.data.menu)
    }
    return response
  }
  // logout: async({commit, state}) => {
  //   const response = api.logout(state.user.loginname)
  //   window.sessionStorage.clear()
  //   window.location.reload()
  //   return response
  // }
}

const mutations = {
  [types.RECORD_AUTH_USER] (state, user) {
    state.user = user
  },
  [types.RECORD_AUTH_MENU] (state, menu) {
    state.menu = menu
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
