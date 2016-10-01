import {
  AuthResource
} from './resources'
import './data'

export default {
  login: function(payload) {
    return AuthResource.get({
      action: 'login',
      ...payload
    })
  }
}
