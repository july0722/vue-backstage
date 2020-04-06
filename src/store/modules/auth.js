import http from '@/plugins/axios'
import * as types from '../mutation-types'
import api from '@/api'

const state = {
  user: '',
  menus: [],
  permissions: []
}

const getters = {
  loggedIn: (state) => !!state.user
}

const actions = {
  login: async ({ commit }, payload) => {
    let response = await api.login(payload)
    if (response.successful) {
      commit(types.RECORD_AUTH_USER, payload.account)
      response = await http.get('/sys/index/getUserMenus')
      commit(types.RECORD_AUTH_MENUS, response.data.data)
    }
    return response
  },
  logout: ({ commit }) => {
    http.post('/login/logout').then((res) => {
      res.successful && commit(types.RECORD_AUTH_USER, '')
      // router.push('/login')
    })
  }
}

const mutations = {
  [types.RECORD_AUTH_USER](state, user) {
    state.user = user
  },
  [types.RECORD_AUTH_PERMISSIONS](state, permissions) {
    state.permissions = permissions
  },
  [types.RECORD_AUTH_MENUS](state, menus) {
    state.menus = menus
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
