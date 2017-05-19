import Mock from 'mockjs'

export function login() {
  return Mock.mock({
    code: 1000,
    user: {
      id: 1,
      account: 'test',
      username: '@cname'
    },
    permissions: [{
      name: '系统管理',
      children: [{
        name: '用户管理',
        path: '/user'
      }, {
        name: '角色管理',
        path: '/role'
      }]
    }]
  })
}
