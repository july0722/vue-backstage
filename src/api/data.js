import Mock from 'mockjs'

Mock.mock(/\/api\/auth\/log/, {
  id: 1,
  name: '@name',
  color: '@color'
})
