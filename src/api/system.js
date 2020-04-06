import request from '@/utils/request'

export default {
  users: (data) => request('/system/users', data, 'POST', 'JSON')
}
