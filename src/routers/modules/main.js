import React from 'react'
import loadable from '@loadable/component'
const Dashbord = loadable(() => import('@/pages/dashboard'), { fallback: <div>加载中...</div> })
const UIAsyncPage = loadable((props) => import(`@/pages/ui/${props.page}/index.jsx`), {
  fallback: <div>加载中...</div>
})
const Login = loadable((props) => import(`@/pages/login`), {
  fallback: <div>加载中...</div>
})
const Register = loadable((props) => import(`@/pages/reg`), {
  fallback: <div>加载中...</div>
})
// 基础表格
const BaseTable = loadable((props) => import(`@/pages/tables/base-tab`), {
  fallback: <div>加载中...</div>
})
// 高级表格
const AdvanceTable = loadable((props) => import(`@/pages/tables/advance-tab`), {
  fallback: <div>加载中...</div>
})

const CityManage = loadable((props) => import(`@/pages/city`), {
  fallback: <div>加载中...</div>
})
const OrderManage = loadable((props) => import(`@/pages/order`), {
  fallback: <div>加载中...</div>
})
const EmployeeManage = loadable((props) => import(`@/pages/employee`), {
  fallback: <div>加载中...</div>
})
const MapPage = loadable((props) => import(`@/pages/map`), {
  fallback: <div>加载中...</div>
})
const BarPage = loadable((props) => import(`@/pages/echarts/bar`), {
  fallback: <div>加载中...</div>
})
const LinePage = loadable((props) => import(`@/pages/echarts/line`), {
  fallback: <div>加载中...</div>
})
const PiePage = loadable((props) => import(`@/pages/echarts/pie`), {
  fallback: <div>加载中...</div>
})
const AreaPage = loadable((props) => import(`@/pages/rich-text`), {
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
    icon: '',
    children: [
      {
        name: '登录',
        path: '/admin/form/login',
        component: Login,
        icon: '',
        exact: true
      },
      {
        name: '注册',
        path: '/admin/form/reg',
        component: Register,
        icon: '',
        exact: true
      }
    ]
  },
  {
    name: '表格',
    path: '/admin/table',
    icon: '',
    children: [
      {
        name: '基础表格',
        path: '/admin/table/base',
        component: BaseTable,
        icon: '',
        exact: true
      },
      {
        name: '高级表格',
        path: '/admin/table/advance',
        component: AdvanceTable,
        icon: '',
        exact: true
      }
    ]
  },
  {
    name: '富文本',
    path: '/admin/richtext',
    component: AreaPage,
    icon: '',
    exact: true
  },
  {
    name: '城市管理',
    path: '/admin/city',
    component: CityManage,
    icon: '',
    exact: true
  },
  {
    name: '订单管理',
    path: '/admin/order',
    component: OrderManage,
    icon: '',
    exact: true
  },
  {
    name: '员工管理',
    path: '/admin/user',
    component: EmployeeManage,
    icon: '',
    exact: true
  },
  {
    name: '车辆地图',
    path: '/admin/map',
    component: MapPage,
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
        component: BarPage,
        icon: '',
        exact: true
      },
      {
        name: '饼图',
        path: '/admin/charts/pie',
        component: PiePage,
        icon: '',
        exact: true
      },
      {
        name: '折线图',
        path: '/admin/charts/line',
        component: LinePage,
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
