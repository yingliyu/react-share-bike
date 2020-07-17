import React, { useState, useEffect } from 'react'
import { Card, Divider, message } from 'antd'
import { orderApi } from '@/services'
import styles from './index.module.less'
import positionData from './imgs/orderMap.js'
export default function OrderDetail(props) {
  const positionList = positionData.result.service_list

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
    } catch (error) {
      message.error(error)
    }
  }
  const renderMap = () => {
    // 创建地图实例
    let map = new window.BMapGL.Map('orderDetailMap', { enableMapClick: false })
    // 初始化地图，设置中心点坐标和地图级别
    map.centerAndZoom(new window.BMapGL.Point(116.404, 39.915), 10)
    // let startPoint = new window.BMapGL.Point(116.399, 39.915)
    addMapContrl(map)
    drawBikeRoute(map, data.positionList)
    drawServieArea(map, data.positionList)
  }
  // 添加地图控件
  const addMapContrl = (map) => {
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    let scaleCtrl = new window.BMapGL.ScaleControl({ anchor: window.BMAP_ANCHOR_BOTTOM_LEFT }) // 添加比例尺控件
    map.addControl(scaleCtrl)
    let zoomCtrl = new window.BMapGL.ZoomControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }) // 添加缩放控件
    map.addControl(zoomCtrl)
  }
  // 添加行车路线
  const drawBikeRoute = (map, positionList) => {
    if (positionList.length) {
      let startPoint = new window.BMapGL.Point(116.310791, 40.003419)

      let startIcon = new window.BMapGL.Icon(
        require('./imgs/start_point.png'),
        new window.BMapGL.Size(36, 42),
        {
          imageSize: new window.BMapGL.Size(36, 42),
          anchor: new window.BMapGL.Size(36, 42)
        }
      )
      // 创建标注对象并添加到地图
      let startMarker = new window.BMapGL.Marker(startPoint, { icon: startIcon })
      map.addOverlay(startMarker)
      // let endPoint = new window.BMapGL.Point(116.425, 39.9)
      let endPoint = new window.BMapGL.Point(116.486419, 39.877282)
      let endIcon = new window.BMapGL.Icon(
        require('./imgs/end_point.png'),
        new window.BMapGL.Size(36, 42),
        {
          imageSize: new window.BMapGL.Size(36, 42),
          anchor: new window.BMapGL.Size(36, 42)
        }
      )
      // 创建标注对象并添加到地图
      let endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon })
      map.addOverlay(endMarker)

      let polyline1 = new window.BMapGL.Polyline(
        [
          // new window.BMapGL.Point(116.399, 39.915),
          new window.BMapGL.Point(116.310791, 40.003419),
          // new window.BMapGL.Point(116.399, 39.915),
          new window.BMapGL.Point(116.425, 39.9),
          new window.BMapGL.Point(116.486419, 39.877282)
        ],
        { strokeColor: 'red', strokeWeight: 3, strokeOpacity: 0.9 }
      )
      map.addOverlay(polyline1)
    }
  }
  // 绘制服务区
  const drawServieArea = (map, positionList) => {
    // 连接线路图
    let trackPoint = []
    for (let i = 0; i < positionList.length; i++) {
      let point = positionList[i]
      trackPoint.push(new window.BMapGL.Point(point.lon, point.lat))
    }
    let polyline = new window.BMapGL.Polyline(trackPoint, {
      strokeColor: '#ce0000',
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: '#ce0000',
      fillOpacity: 0.5
    })
    map.addOverlay(polyline)
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
