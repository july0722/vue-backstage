import * as types from '../mutation-types'

const state = {
  user: JSON.parse(window.sessionStorage.getItem('backstage_auth_user')),
  menu: JSON.parse(window.sessionStorage.getItem('backstage_auth_menu'))
}

const mutations = {
  [types.AUTH_LOGIN](state, {
    user,
    menu
  }) {
    state.user = user
    state.menu = menu
    window.sessionStorage.setItem('backstage_auth_user', JSON.stringify(user))
    window.sessionStorage.setItem('backstage_auth_menu', JSON.stringify(menu))
  },
  [types.AUTH_LOGOUT](state) {
    state.user = null
    state.menu = null
    window.sessionStorage.removeItem('backstage_auth_user')
    window.sessionStorage.removeItem('backstage_auth_menu')
  }
}

export default {
  state,
  mutations
}
