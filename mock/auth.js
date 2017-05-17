export function login() {
  return {
    code: 1000,
    user: {
      id: 1,
      account: 'test',
      username: '我是测试'
    },
    permissions: [{
      name: '系统管理',
      children: [{
        name: '用户管理',
        path: '/user'
      }]
    }]
  }
}
