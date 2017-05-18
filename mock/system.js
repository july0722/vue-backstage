import Mock from 'mockjs'

export function getUserList() {
  return Mock.mock({
    code: 1000,
    count: 30,
    'data|5-10': [{
      'id': '@id',
      'username': '@cname',
      'date': '@datetime'
    }]
  })
}