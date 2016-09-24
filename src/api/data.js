import Mock from 'mockjs'

Mock.setup({
  timeout: '500-1000'
})

Mock.mock(/\/api\/auth\/log/, {
  id: 1,
  name: '@name',
  color: '@color'
})
