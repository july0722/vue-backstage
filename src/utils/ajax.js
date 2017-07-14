import axios from 'axios'
import store from '@/store'
import querystring from 'querystring'
import {
  Notification
} from 'element-ui'

export function createResource(resource) {
  let instance = axios.create({
    baseURL: `${process.env.NODE_ENV !== 'production' ? '/api' : ''}/${resource}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
  instance.interceptors.request.use(config => {
    if (config.method === 'get') {
      for (let key in config.params) {
        key.startsWith('_') && delete config.params[key]
      }
      config.params || (config.params = {})
      config.params.token = store.state.auth.token
    } else {
      for (let key in config.data) {
        key.startsWith('_') && delete config.data[key]
      }
      config.data || (config.data = {})
      config.data.token = store.state.auth.token
      config.data = querystring.stringify(config.data)
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

  instance.interceptors.response.use(response => {
    response.successful = response.data.code === 200
    response.config.method === 'get' || (response.successful ? Notification.success({
      title: '成功',
      message: '操作成功！'
    }) : Notification.error({
      title: '失败',
      message: response.data.msg
    }))
    return response
  }, error => {
    Notification.warning({
      title: '错误',
      message: '网络连接失败，请稍后重试！'
    })
    return Promise.reject(error)
  })
  return instance
}
