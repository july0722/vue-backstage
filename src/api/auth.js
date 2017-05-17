import axios from '@/utils/http'

export function login(data) {
  return axios.post('/login', data)
}

export function updatePassword(data) {
  return axios.post('/updatePassword', data)
}

