import request from '@/utils/request'

export default {
  login: (data) => request('/auth/login', data, 'POST', 'JSON')
}
