import axios from '@/utils/resource'

export default {
  login: function (payload) {
    return axios.get('login')
  }
}
