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
const RichText = loadable((props) => import(`@/pages/rich-text/index-draft.jsx`), {
  fallback: <div>加载中...</div>
})
const PermissionPage = loadable((props) => import(`@/pages/permission`), {
  fallback: <div>加载中...</div>
})
const routerMain = [
  {
    title: '首页',
    path: '/admin/dashboard',
    key: '/admin/dashboard',
    component: Dashbord,
    icon: '',
    exact: true
  },
  {
    title: 'UI',
    path: '/admin/ui',
    key: '/admin/ui',
    icon: '',
    children: [
      {
        title: '按钮',
        path: '/admin/ui/buttons',
        key: '/admin/ui/buttons',
        component: () => <UIAsyncPage page="button" />,
        icon: '',
        exact: true
      },
      {
        title: '弹框',
        path: '/admin/ui/modals',
        key: '/admin/ui/modals',
        component: () => <UIAsyncPage page="modal" />,
        icon: '',
        exact: true
      },
      {
        title: 'Loading',
        path: '/admin/ui/loading',
        key: '/admin/ui/loading',
        component: () => <UIAsyncPage page="loading" />,
        icon: '',
        exact: true
      },
      {
        title: '通知提醒',
        path: '/admin/ui/notification',
        key: '/admin/ui/notification',
        component: () => <UIAsyncPage page="notification" />,
        icon: '',
        exact: true
      },
      {
        title: '全局Message',
        path: '/admin/ui/message',
        key: '/admin/ui/message',
        component: () => <UIAsyncPage page="message" />,
        icon: '',
        exact: true
      },
      {
        title: 'Tab页签',
        path: '/admin/ui/tab',
        key: '/admin/ui/tab',
        component: () => <UIAsyncPage page="tabs" />,
        icon: '',
        exact: true
      },
      {
        title: '图片画廊',
        path: '/admin/ui/gallery',
        key: '/admin/ui/gallery',
        component: () => <UIAsyncPage page="gallery" />,
        icon: '',
        exact: true
      },
      {
        title: '轮播图',
        path: '/admin/ui/carousel',
        key: '/admin/ui/carousel',
        component: () => <UIAsyncPage page="carousel" />,
        icon: '',
        exact: true
      }
    ]
  },
  {
    title: '表单',
    path: '/admin/form',
    key: '/admin/form',
    icon: '',
    children: [
      {
        title: '登录',
        path: '/admin/form/login',
        key: '/admin/form/login',
        component: Login,
        icon: '',
        exact: true
      },
      {
        title: '注册',
        path: '/admin/form/reg',
        key: '/admin/form/reg',
        component: Register,
        icon: '',
        exact: true
      }
    ]
  },
  {
    title: '表格',
    path: '/admin/table',
    key: '/admin/table',
    icon: '',
    children: [
      {
        title: '基础表格',
        path: '/admin/table/base',
        key: '/admin/table/base',
        component: BaseTable,
        icon: '',
        exact: true
      },
      {
        title: '高级表格',
        path: '/admin/table/advance',
        key: '/admin/table/advance',
        component: AdvanceTable,
        icon: '',
        exact: true
      }
    ]
  },
  {
    title: '富文本',
    path: '/admin/richtext',
    key: '/admin/richtext',
    icon: '',
    children: [
      {
        title: '方案一',
        path: '/admin/richtext/braft-editor',
        key: '/admin/richtext/braft-editor',
        component: AreaPage,
        icon: '',
        exact: true
      },
      {
        title: '方案二',
        path: '/admin/richtext/draft-wysiwyg',
        key: '/admin/richtext/draft-wysiwyg',
        component: RichText,
        icon: '',
        exact: true
      }
    ]
  },
  {
    title: '城市管理',
    path: '/admin/city',
    key: '/admin/city',
    component: CityManage,
    icon: '',
    exact: true
  },
  {
    title: '订单管理',
    path: '/admin/order',
    key: '/admin/order',
    component: OrderManage,
    icon: '',
    exact: true
  },
  {
    title: '员工管理',
    path: '/admin/user',
    key: '/admin/user',
    component: EmployeeManage,
    icon: '',
    exact: true
  },
  {
    title: '车辆地图',
    path: '/admin/map',
    key: '/admin/map',
    component: MapPage,
    icon: '',
    exact: true
  },
  {
    title: '图表',
    path: '/admin/charts',
    key: '/admin/charts',
    component: null,
    icon: '',
    exact: true,
    children: [
      {
        title: '柱形图',
        path: '/admin/charts/bar',
        key: '/admin/charts/bar',
        component: BarPage,
        icon: '',
        exact: true
      },
      {
        title: '饼图',
        path: '/admin/charts/pie',
        key: '/admin/charts/pie',
        component: PiePage,
        icon: '',
        exact: true
      },
      {
        title: '折线图',
        path: '/admin/charts/line',
        key: '/admin/charts/line',
        component: LinePage,
        icon: '',
        exact: true
      }
    ]
  },
  {
    title: '权限设置',
    path: '/admin/permission',
    key: '/admin/permission',
    component: PermissionPage,
    icon: '',
    exact: true
  }
]

export default routerMain
