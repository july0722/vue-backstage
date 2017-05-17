import Mock from 'mockjs'
import * as authApi from './auth'
import * as systemApi from './system'

Mock.setup({
  timeout: '300-500'
})

Mock.mock(/\/login/, authApi.login)

Mock.mock(/\/getUserList/, systemApi.getUserList)

