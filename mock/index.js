import Mock from 'mockjs'
import * as authApi from './auth'
import * as systemApi from './system'

Mock.setup({
  timeout: '300-500'
})

Mock.mock(/token/, authApi.login)

Mock.mock(/user/, systemApi.getUserList)
Mock.mock(/user\/*/, systemApi.getUser)
