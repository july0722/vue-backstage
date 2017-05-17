import * as types from '../mutation-types'
import * as api from '@/api/auth'

const state = {
  user: {},
  permissions: []
}

const getters = {
  currentUser: state => state.user,
  currentPermissions: state => state.permissions,
  loggedIn: state => !!state.user.id
}

const actions = {
  login: async({
    commit,
    state
  }, payload) => {
    const response = await api.login(payload)
    if (response.successful) {
      commit(types.RECORD_AUTH_USER, response.data.user)
      commit(types.RECORD_AUTH_PERMISSIONS, response.data.permissions)
    }
    return response
  },
  logout: ({
    commit,
    state
  }) => {
    commit(types.RECORD_AUTH_USER, {})
    commit(types.RECORD_AUTH_PERMISSIONS, [])
  }
}

const mutations = {
  [types.RECORD_AUTH_USER](state, user) {
    state.user = user
  },
  [types.RECORD_AUTH_PERMISSIONS](state, permissions) {
    state.permissions = permissions
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
