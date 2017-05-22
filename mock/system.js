import Mock from 'mockjs'

export function getUser() {
  return Mock.mock({
    code: 1000,
    'user': {
      'id': '@id',
      'account': '@word(6, 10)',
      'username': '@cname',
      'date': '@datetime',
      'status': '@integer(0, 1)'
    }
  })
}

export function getUserList() {
  return Mock.mock({
    code: 1000,
    count: 30,
    'data|5-10': [{
      'id': '@id',
      'account': '@word(6, 10)',
      'username': '@cname',
      'date': '@datetime',
      'status': '@integer(0, 1)'
    }]
  })
}
