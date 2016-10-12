import {
  AuthResource,
  SystemResource
} from './resources'
import './data'

export default {
  // AuthResource
  login: function(payload) {
    return AuthResource.get({
      action: 'login',
      ...payload
    })
  },
  // SystemResource
  fetchUserList: function(payload) {
    return SystemResource.get({
      action: 'user/fetchList',
      ...payload
    })
  }
}
