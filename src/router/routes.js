const a8b = () => import(/* webpackChunkName: "a8b" */ '@/views/a8b')
const dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard')
const error = () => import(/* webpackChunkName: "error" */ '@/views/error')
const login = () => import(/* webpackChunkName: "login" */ '@/views/login')
const contentDrafts = () => import(/* webpackChunkName: "contentDrafts" */ '@/views/content/_drafts')
const contentPublish = () => import(/* webpackChunkName: "contentPublish" */ '@/views/content/_publish')
const contentIndex = () => import(/* webpackChunkName: "contentIndex" */ '@/views/content/index')
const systemUserIndex = () => import(/* webpackChunkName: "systemUserIndex" */ '@/views/system/user/index')
export default [
  {
    name: 'a8b',
    path: '/a8b',
    component: a8b
  },
  {
    name: 'content',
    path: '/content',
    component: contentIndex
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: dashboard
  },
  {
    name: 'error',
    path: '/error',
    component: error
  },
  {
    name: 'login',
    path: '/login',
    component: login
  },
  {
    name: 'system-user',
    path: '/system/user',
    component: systemUserIndex
  },
  {
    name: 'content-drafts',
    path: '/content/:drafts?',
    component: contentDrafts
  },
  {
    name: 'content-publish',
    path: '/content/:publish?',
    component: contentPublish
  }
]
