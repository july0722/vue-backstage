// import * as types from '../mutation-types'

const state = {
  breadcrumb: null,
  menu: [{
    name: '平台概况',
    icon: 'menu',
    path: '/dashboard'
  }, {
    name: '平台管理',
    icon: 'setting',
    children: [{
      name: '账号管理',
      path: '/dd'
    }, {
      name: '菜单管理',
      path: '/password'
    }]
  }]

}

const mutations = {
  // [types.AUTH_LOGIN](state, user) {
  //   state.user = user
  //   window.sessionStorage.setItem('backstage_auth_user', JSON.stringify(user))
  // },
  // [types.AUTH_LOGOUT](state) {
  //   state.user = null
  //   window.sessionStorage.removeItem('backstage_auth_user')
  // }
}

export default {
  state,
  mutations
}
