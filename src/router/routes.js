import Main from '@/views/Main'

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('@/views/auth/login')
}

export const appRouter = [
  {
    path: '/system',
    icon: 'key',
    component: Main,
    children: [
      {
        path: 'user',
        title: '用户管理',
        component: () => import('@/views/system/user')
      }
    ]
  }
]

export const routes = [loginRouter, ...appRouter]
