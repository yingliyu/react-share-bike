import React from 'react'
import loadable from '@loadable/component'
const Login = loadable(() => import('@/pages/login'), { fallback: <div>加载中...</div> })
const NotFound = loadable(() => import('@/pages/404'), { fallback: <div>加载中...</div> })

export default [
  {
    name: '登陆',
    path: '/login',
    exact: true,
    component: Login
  },
  {
    name: 'Not Found',
    path: '/404',
    exact: true,
    component: NotFound
  }
]
