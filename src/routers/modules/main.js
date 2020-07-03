import React from 'react'
import loadable from '@loadable/component'
const Dashbord = loadable(() => import('@/pages/dashboard'), { fallback: <div>加载中...</div> })
const UIAsyncPage = loadable((props) => import(`@/pages/ui/${props.page}/index.jsx`), {
  fallback: <div>加载中...</div>
})

const routerMain = [
  {
    name: '首页',
    path: '/admin/dashboard',
    component: Dashbord,
    icon: '',
    exact: true
  },
  {
    name: 'UI',
    path: '/admin/ui',
    icon: '',
    children: [
      {
        name: '按钮',
        path: '/admin/ui/buttons',
        component: () => <UIAsyncPage page="button" />,
        icon: '',
        exact: true
      },
      {
        name: '弹框',
        path: '/admin/ui/modals',
        component: () => <UIAsyncPage page="modal" />,
        icon: '',
        exact: true
      },
      {
        name: 'Loading',
        path: '/admin/ui/loading',
        component: () => <UIAsyncPage page="loading" />,
        icon: '',
        exact: true
      },
      {
        name: '通知提醒',
        path: '/admin/ui/notification',
        component: () => <UIAsyncPage page="notification" />,
        icon: '',
        exact: true
      },
      {
        name: '全局Message',
        path: '/admin/ui/message',
        component: () => <UIAsyncPage page="message" />,
        icon: '',
        exact: true
      },
      {
        name: 'Tab页签',
        path: '/admin/ui/tab',
        component: () => <UIAsyncPage page="tabs" />,
        icon: '',
        exact: true
      },
      {
        name: '图片画廊',
        path: '/admin/ui/gallery',
        component: () => <UIAsyncPage page="gallery" />,
        icon: '',
        exact: true
      },
      {
        name: '轮播图',
        path: '/admin/ui/carousel',
        component: () => <UIAsyncPage page="carousel" />,
        icon: '',
        exact: true
      }
    ]
  },
  {
    name: '表单',
    path: '/admin/form',
    component: null,
    icon: '',
    exact: true,
    children: [
      {
        name: '登录',
        path: '/admin/form/login',
        component: null,
        icon: '',
        exact: true
      },
      {
        name: '注册',
        path: '/admin/form/reg',
        component: null,
        icon: '',
        exact: true
      }
    ]
  },
  {
    name: '表格',
    path: '/admin/table',
    component: null,
    icon: '',
    exact: true,
    children: [
      {
        name: '基础表格',
        path: '/admin/table/base',
        component: null,
        icon: '',
        exact: true
      },
      {
        name: '高级表格',
        path: '/admin/table/advance',
        component: null,
        icon: '',
        exact: true
      }
    ]
  },
  {
    name: '富文本',
    path: '/admin/textarea',
    component: null,
    icon: '',
    exact: true
  },
  {
    name: '城市管理',
    path: '/admin/city',
    component: null,
    icon: '',
    exact: true
  },
  {
    name: '订单管理',
    path: '/admin/order',
    component: null,
    icon: '',
    exact: true
  },
  {
    name: '员工管理',
    path: '/admin/user',
    component: null,
    icon: '',
    exact: true
  },
  {
    name: '车辆地图',
    path: '/admin/bikeMap',
    component: null,
    icon: '',
    exact: true
  },
  {
    name: '图表',
    path: '/admin/charts',
    component: null,
    icon: '',
    exact: true,
    children: [
      {
        name: '柱形图',
        path: '/admin/charts/bar',
        component: null,
        icon: '',
        exact: true
      },
      {
        name: '饼图',
        path: '/admin/charts/pie',
        component: null,
        icon: '',
        exact: true
      },
      {
        name: '折线图',
        path: '/admin/charts/line',
        component: null,
        icon: '',
        exact: true
      }
    ]
  },
  {
    name: '权限设置',
    path: '/admin/permission',
    component: null,
    icon: '',
    exact: true
  }
]

export default routerMain
