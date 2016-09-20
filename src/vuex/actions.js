require('babel-polyfill')
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
    // return new Promise((resolve, reject) => {
    //   api.login({
    //     ...payload
    //   }).then((response) => {
    //     commit(types.AUTH_LOGIN, response.data)
    //     return resolve(response.data)
    //   }).catch((error) => {
    //     return reject(error)
    //   })
    // })
}

export const logout = ({
  commit
}) => {
  commit(types.AUTH_LOGOUT)
}
