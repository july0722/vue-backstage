import axios from '@/utils/resource'

export default {
  login: data => {
    return axios.post('login', data)
  }
}
