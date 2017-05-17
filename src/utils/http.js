import axios from 'axios'
import querystring from 'querystring'
import {
  Notification
} from 'element-ui'

// axios.defaults.baseURL = process.env.ORIGIN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

axios.interceptors.request.use(config => {
  config.method === 'post' && (config.data = querystring.stringify(config.data))
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  response.successful = response.data.code === 1000
  response.config.method === 'post' && (response.successful ? Notification.success({ title: '成功', message: '操作成功！' })
    : Notification.error({ title: '失败', message: response.data.msg }))
  return response
}, error => {
  Notification.warning({
    title: '错误',
    message: '网络连接失败，请稍后重试！'
  })
  return Promise.reject(error)
})

export default axios
