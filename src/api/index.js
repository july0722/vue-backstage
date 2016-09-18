import {
  AuthResource
} from './resources'
import './data'

export default {
  login: function(data) {
    return AuthResource.get({
      action: 'login',
      ...data
    })
  }
    // login: function(data) {
    //   return AuthResource.save({
    //     action: 'login'
    //   }, data)
    // }
}
