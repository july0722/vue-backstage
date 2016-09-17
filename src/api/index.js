import {
  AuthResource
} from './resources'

export default {
  login: function(data) {
    return AuthResource.save({
      action: 'login'
    }, data)
  }
}
