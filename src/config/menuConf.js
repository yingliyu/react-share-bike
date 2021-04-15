const menuList = [
  {
    title: '首页',
    key: '/admin/home'
  },
  {
    title: 'UI',
    key: '/admin/ui',
    children: [
      {
        title: '按钮',
        key: '/admin/ui/buttons'
      },
      {
        title: '弹框',
        key: '/admin/ui/modals'
      },
      {
        title: 'Loading',
        key: '/admin/ui/modals'
      },
      {
        title: '通知提醒',
        key: '/admin/ui/notification'
      },
      {
        title: '全局Message',
        key: '/admin/ui/message'
      },
      {
        title: 'Tab页签',
        key: '/admin/ui/tabs'
      },
      {
        title: '图片画廊',
        key: '/admin/ui/gallery'
      },
      {
        title: '轮播图',
        key: '/admin/ui/callor'
      }
    ]
  },
  {
    title: '表单',
    key: '/admin/form',
    children: [
      {
        title: '登录',
        key: '/admin/form/login'
      },
      {
        title: '注册',
        key: '/admin/form/reg'
      }
    ]
  },
  {
    title: '表格',
    key: '/admin/table',
    children: [
      {
        title: '基础表格',
        key: '/admin/table/base'
      },
      {
        title: '高级表格',
        key: '/admin/table/advance'
      }
    ]
  },
  {
    title: '富文本',
    key: '/admin/textarea'
  },
  {
    title: '城市管理',
    key: '/admin/city'
  },
  {
    title: '订单管理',
    key: '/admin/order'
  },
  {
    title: '员工管理',
    key: '/admin/user'
  },
  {
    title: '车辆地图',
    key: '/admin/bikeMap'
  },
  {
    title: '图表',
    key: '/admin/charts',
    children: [
      {
        title: '柱形图',
        key: '/admin/charts/bar'
      },
      {
        title: '饼图',
        key: '/admin/charts/pie'
      },
      {
        title: '折线图',
        key: '/admin/charts/line'
      }
    ]
  },
  {
    title: '权限设置',
    key: '/admin/permission'
  }
]

export default menuList
