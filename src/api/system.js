import axios from '@/utils/http'

export function getUserList(data) {
  return axios.get('/getUserList', {
    params: data
  })
}

export function getUser(id) {
  return axios.get(`/getUser/${id}`)
}

export function createUser(data) {
  return axios.post('/createUser', data)
}

export function updateUser(data) {
  return axios.post(`/updateUser`, data)
}
