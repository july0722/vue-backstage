import Main from '@/views/Main'

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: () => import('@/views/auth/login')
}

export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    {
      path: 'home',
      title: { i18n: 'home' },
      name: 'home',
      component: resolve => {
        require(['@/views/home/home.vue'], resolve)
      }
    }
  ]
}

export const appRouter = [
  {
    path: '/system',
    icon: 'setting',
    name: '系统管理',
    component: Main,
    children: [
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/system/role')
      },
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/system/user')
      }
    ]
  }
]

export const routes = [loginRouter, ...appRouter]
