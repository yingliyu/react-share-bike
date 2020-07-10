import React, { useState, useEffect } from 'react'
import { Card, Divider } from 'antd'
import { orderApi } from '@/services'
import styles from './index.module.less'
import positionData from './imgs/orderMap.js'
const positionList = positionData.result.service_list
export default function OrderDetail(props) {
  // const [orderMap, setMap] = useState(null)
  const [id, setId] = useState('')
  const [data, setData] = useState({
    useBikeMode: '',
    orderId: '',
    bikeNo: '',
    userName: '',
    phone: '',
    startPoint: '',
    endPoint: '',
    totalLength: '',
    positionList: positionList,
    area: ''
  })
  useEffect(() => {
    initData()
    setId(props.match.params.orderId)
    renderMap()
  }, [])
  const initData = async () => {
    try {
      const res = await orderApi.getOrderDetail({ id: id })
      setData(res)
    } catch (error) {}
  }
  const renderMap = () => {
    let map = new window.BMapGL.Map('orderDetailMap', { enableMapClick: false })
    // 创建地图实例
    let point = new window.BMapGL.Point(116.404, 39.915)
    // 创建点坐标
    map.centerAndZoom(point, 15)
    // 初始化地图，设置中心点坐标和地图级别
    // 添加地图控件
    let scaleCtrl = new window.BMapGL.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }) // 添加比例尺控件
    map.addControl(scaleCtrl)
    let zoomCtrl = new window.BMapGL.ZoomControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }) // 添加比例尺控件
    map.addControl(zoomCtrl)
    drawBikeRoute(map, data.positionList)
  }
  const drawBikeRoute = (map, positionList) => {
    console.log(positionList)
    if (positionList.length) {
      // const point1 = positionList[0]
      // const point2 = positionList[1]
      const startPoint = new window.BMapGL.Point(116.301934, 39.977552)
      const endPoint = new window.BMapGL.Point(116.508328, 39.919141)
      console.log(endPoint)
      const startIcon = new window.BMapGL.Icon('./imgs/start.png', new window.BMapGL.Size(36, 42), {
        imageSize: new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(36, 42)
      })
      let startMarker = new window.BMapGL.Marker(startPoint, { icon: startIcon })
      map.addOverlay(startMarker)
      const endIcon = new window.BMapGL.Icon('./imgs/end.png', new window.BMapGL.Size(36, 42), {
        imageSize: new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(36, 42)
      })
      let endMarker = new window.BMapGL.Marker(startPoint, { icon: endIcon })
      map.addOverlay(endMarker)
      // 连接线路图
      let trackPoint = []
      for (let i = 0; i < positionList.length; i++) {
        let point = positionList[i]
        trackPoint.push(new window.BMapGL.Point(point.lon, point.lat))
      }
      let polyline = new window.BMapGL.Polyline(trackPoint, {
        strokeColor: 'red',
        strokeWeight: 3,
        strokeOpacity: 1
      })
      map.addOverlay(polyline)
      console.log(trackPoint)
      // map.centerAndZoom(trackPoint, 11)
    }
  }
  return (
    <div className={styles['order-detail-wrapper']}>
      <Card title="行程地图">
        <div id="orderDetailMap" className={styles['order-map-wrapper']} />
      </Card>
      <Card>
        <dl className={styles['info-wrapper']}>
          <dt>基础信息</dt>
          <dd>
            <span>用车模式</span>
            <b>{data.useBikeMode === 1 ? '指定停车点模式' : '禁停区模式'}</b>
          </dd>
          <dd>
            <span>订单编号</span>
            <b>{data.orderId}</b>
          </dd>
          <dd>
            <span>车辆编号</span>
            <b>{data.bikeNo}</b>
          </dd>
          <dd>
            <span>用户姓名</span>
            <b>{data.userName}</b>
          </dd>
          <dd>
            <span>手机号码</span>
            <b>{data.phone}</b>
          </dd>
        </dl>
        <Divider />
        <dl className={styles['info-wrapper']}>
          <dt>行驶轨迹</dt>
          <dd>
            <span>行程起点</span>
            <b>{data.startPoint}</b>
          </dd>
          <dd>
            <span>行程终点</span>
            <b>{data.endPoint}</b>
          </dd>
          <dd>
            <span>行驶里程</span>
            <b>{data.totalLength}.00 km</b>
          </dd>
        </dl>
      </Card>
    </div>
  )
}
