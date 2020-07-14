import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import { Card } from 'antd'
import QueryForm from '@/components/query-form'
import Map from './data.json'
export default function OrderManage(props) {
  const searchFormDefaultValues = {
    cityName: '',
    orderStatus: '',
    time: []
  }

  const formList = [
    {
      type: 'SELECT',
      label: '城市',
      name: 'cityName',
      placeholder: '全部',
      initVal: 0,
      width: 200,
      list: [
        { id: '', name: '全部' },
        { id: '1', name: '上海' },
        { id: '2', name: '深圳' },
        { id: '3', name: '天津' },
        { id: '4', name: '北京' }
      ]
    },
    {
      type: 'DATEPICKER',
      label: '订单时间',
      name: 'time'
    },
    {
      type: 'SELECT',
      label: '订单状态',
      name: 'orderStatus',
      placeholder: '全部',
      initVal: 1,
      width: 200,
      list: [
        { id: '', name: '全部' },
        { id: '1', name: '进行中' },
        { id: '2', name: '结束行程' }
      ]
    }
  ]
  useEffect(() => {
    initData()
  }, [])
  const dateFormat = 'YYYY-MM-DD HH:mm:ss'
  const [total, setTotal] = useState(0)
  const handleSearchSubmit = (values) => {
    const params = {
      cityName: values.cityName,
      orderStatus: values.orderStatus,
      startTime: values.time && values.time[0] ? values.time[0].format(dateFormat) : '',
      endTime: values.time && values.time[1] ? values.time[1].format(dateFormat) : ''
    }
    initData(params)
  }

  const initData = async (params) => {
    setTotal(Map.data.total)
    renderMap(Map.data)
  }
  const renderMap = (data) => {
    const list = data.route_list
    // 初始化地图
    let map = new window.BMapGL.Map('container', { enableMapClick: false })
    const gps2 = list[list.length - 1].split(',')
    const endPoint = new window.BMapGL.Point(gps2[0], gps2[1])
    map.centerAndZoom(new window.BMapGL.Point(endPoint.lng, endPoint.lat), 11)
    addMapContrl(map)
    addBikeRoutes(map, list)
    renderMapService(map, data.service_list)
    addBikeIcon(map, data.bike_list)
  }
  // 添加自行车图标
  const addBikeIcon = (map, list) => {
    let bikeIcon = new window.BMapGL.Icon(
      require('./imgs/bike.jpg'),
      new window.BMapGL.Size(30, 35),
      {
        imageSize: new window.BMapGL.Size(30, 35),
        anchor: new window.BMapGL.Size(15, 42)
      }
    )
    list.forEach((item) => {
      const p = item.split(',')
      let point = new window.BMapGL.Point(p[0], p[1])
      let marker = new window.BMapGL.Marker(point, { icon: bikeIcon })
      map.addOverlay(marker)
    })
  }
  // 绘制服务区
  const renderMapService = (map, list) => {
    let servicesList = []
    list.forEach((item) => {
      servicesList.push(new window.BMapGL.Point(item.lon, item.lat))
    })
    let polygon = new window.BMapGL.Polyline(servicesList, {
      strokeColor: 'red',
      strokeWidth: 5,
      strokeOpacity: 1,
      fillColor: 'orange',
      fillOpacity: 0.4
    })
    map.addOverlay(polygon)
  }

  // 添加地图起始图标及骑行路线
  const addBikeRoutes = (map, list) => {
    const gps1 = list[0].split(',')
    const gps2 = list[list.length - 1].split(',')
    const startPoint = new window.BMapGL.Point(gps1[0], gps1[1])
    const endPoint = new window.BMapGL.Point(gps2[0], gps2[1])
    let startPointIcon = new window.BMapGL.Icon(
      require('./imgs/start_point.png'),
      new window.BMapGL.Size(36, 42),
      {
        imageSize: new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(18, 42)
      }
    )
    // 创建标注对象并添加到地图
    let startMarker = new window.BMapGL.Marker(startPoint, { icon: startPointIcon })
    map.addOverlay(startMarker)
    let endPointIcon = new window.BMapGL.Icon(
      require('./imgs/end_point.png'),
      new window.BMapGL.Size(36, 42),
      {
        imageSize: new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(18, 42)
      }
    )
    // 创建标注对象并添加到地图
    let endMarker = new window.BMapGL.Marker(endPoint, { icon: endPointIcon })
    map.addOverlay(endMarker)
    // 绘制行车路线
    let routesList = []
    list.forEach((item) => {
      let p = item.split(',')
      routesList.push(new window.BMapGL.Point(p[0], p[1]))
    })
    let polyline = new window.BMapGL.Polyline(routesList, {
      strokeColor: 'red',
      strokeWidth: 5,
      strokeOpacity: 1
    })
    map.addOverlay(polyline)
  }
  // 添加地图控件
  const addMapContrl = (map) => {
    // map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    let scaleCtrl = new window.BMapGL.ScaleControl({ anchor: window.BMAP_ANCHOR_BOTTOM_LEFT }) // 添加比例尺控件
    map.addControl(scaleCtrl)
    let zoomCtrl = new window.BMapGL.ZoomControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }) // 添加缩放控件
    map.addControl(zoomCtrl)
  }
  return (
    <div className={styles['order-manage-wrapper']}>
      <Card>
        <QueryForm
          submitHandle={handleSearchSubmit}
          formList={formList}
          initialValues={searchFormDefaultValues}
        />
      </Card>
      <Card>
        <p>共搜询到{total}辆车</p>
        <div id="container" style={{ width: '100%', height: 600 }} />
      </Card>
    </div>
  )
}
