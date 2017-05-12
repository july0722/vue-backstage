import {
  AuthResource
} from './resources'
// import './data'

export default {
  // AuthResource
  login: function (payload) {
    return AuthResource.get({
      action: 'login',
      ...payload
    })
  }
}
