import * as types from './mutation-types'
import api from '../api'

export const login = async({
  commit,
  state
}, payload) => {
  let response = await api.login({
    ...payload
  })
  commit(types.AUTH_LOGIN, response.data)
  return response.data
}

export const logout = ({
  commit
}) => {
  commit(types.AUTH_LOGOUT)
}
