import layout from '@/components/layout'

export default [
  {
    path: '/',
    redirect: '/login',
    component: layout,
    children: [
      {
        path: '/dashboard',
        component: () =>
          import(/* webpackChunkName: "login" */ '@/views/dashboard')
      },
      {
        path: '/sys/user',
        component: () =>
          import(/* webpackChunkName: "login" */ '@/views/system/user')
      },
      {
        path: '/content/:code',
        component: () =>
          import(/* webpackChunkName: "login" */ '@/views/content')
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login')
  },
  {
    path: '/error',
    component: () => import(/* webpackChunkName: "error" */ '@/views/error')
  },
  {
    path: '*',
    redirect: '/error'
  }
]
