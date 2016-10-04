import Mock from 'mockjs'

Mock.setup({
  timeout: '500-1000'
})

Mock.mock(/\/api\/auth\/log/, {
  user: {
    id: 1,
    name: '@name'
      // color: '@color'
  },
  menu: [{
    name: '平台概况',
    icon: 'menu',
    path: '/dashboard'
  }, {
    name: '平台管理',
    icon: 'setting',
    children: [{
      name: '账号管理',
      path: '/dd'
    }, {
      name: '菜单管理',
      path: '/password'
    }]
  }]
})
