import axios from 'axios'
import { Notification } from 'element-ui'
import router from '@/router'
import store from '@/store'
import * as types from '@/store/mutation-types'

const instance = axios.create({
  baseURL: '/api/manager'
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }
})

instance.interceptors.response.use(
  response => {
    response.successful = response.data.issuccess
    if (!response.successful) {
      // if (res.code === '0001') {
      //   store.commit(types.RECORD_AUTH_USER, '');
      //   window.OriginUrl = `${location.origin}/login`;
      //   router.replace({
      //     path: '/login',
      //     query: {
      //       redirect: router.currentRoute.home
      //     }
      //   });
      // } else {
      //   if (!toastFlags.some(x => response.config.url.includes(x))) {
      //     toast(res.message || res.msg);
      //   }
      // }
      response.data.message &&
        response.config.url.indexOf('checkUnique') === -1 &&
        Notification.error({
          title: '失败',
          message: response.data.message
        })
    } else {
      response.config.method === 'post' &&
        response.data.message &&
        Notification.success({
          title: '成功',
          message: response.data.message
        })
    }
    return response
  },
  error => {
    if (typeof error.response.data === 'object') {
      Notification.error({
        title: '错误',
        message: error.response.data.message
      })
      if (error.response.status === 401) {
        store.commit(types.RECORD_AUTH_USER, '')
        router.push('/login')
      }
    } else {
      Notification.warning({
        title: '网络异常',
        message: '您的网络发生异常，无法连接服务器'
      })
    }
    return Promise.reject(error)
  }
)

export default instance
