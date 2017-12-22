import * as types from '../mutation-types'

const state = {
  sidebar: {
    collapse: false
  },
  breadcrumb: [
    {
      title: '首页',
      path: '/home'
    }
  ],
  pages: [{}]
}

const getters = {
  breadcrumb: state => state.breadcrumb
}

const actions = {
  toggleSidebar: ({ commit, state }) => {
    commit(types.RECORD_APP_SIDEBAR_COLLAPSE, !state.sidebar.collapse)
  }
}

const mutations = {
  [types.RECORD_APP_SIDEBAR_COLLAPSE](state, collapse) {
    state.sidebar.collapse = collapse
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
