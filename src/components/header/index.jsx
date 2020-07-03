import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import styles from './index.module.less'
import axios from '@/utils/http'

export default function Header() {
  const currentTime = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  const [time, setTime] = useState(currentTime)
  const [weather, setWeather] = useState('晴转多云')
  useEffect(() => {
    setInterval(
      () => setTime(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()),
      1000
    )
    getWeatherAPIData()
  }, [])

  const getWeatherAPIData = () => {
    const url =
      'http://api.map.baidu.com/weather/v1/?district_id=310104&data_type=now&ak=NOlII9FY384nG6Z2zia86hEaYLKGAEzQ&output=json&callback=?'
    axios.jsonp({ url, timeout: 999999 }).then((res) => {
      console.log(res)
      setWeather()
    })
  }
  return (
    <div className={styles.header}>
      <Row className={styles['header-top']}>
        <Col span={24}>
          <span>欢迎, 七月笙烟</span>
          <a>退出</a>
        </Col>
      </Row>
      <Row className={styles['breadcrumb']}>
        <Col span={4} className={styles['breadcrumb-title']}>
          <span>首页</span>
        </Col>
        <Col span={20} className={styles['weather']}>
          <span className={styles['date']}>{time}</span>
          <span className={styles['weather-detail']}>{weather}</span>
        </Col>
      </Row>
    </div>
  )
}
