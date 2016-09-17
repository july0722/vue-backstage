import * as types from './mutation-types'
import api from '../api'

export const login = ({
  commit,
  state
}, account, password) => {
  console.log(password)
  return new Promise((resolve, reject) => {
    api.login({
      account,
      password
    }).then((data, error) => {
      commit(types.AUTH_LOGIN, {
        ID: 1
      })
      resolve()
    }).catch((err) => {
      reject()
    })
  })
}

export const logout = ({
  commit
}) => {
  commit(types.AUTH_LOGOUT)
}
