import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.module.less'
import Cookie from 'js-cookie'
import logo from './imgs/logo.png'
import { connect } from 'react-redux'

function Header(props) {
  const { menuType } = props
  const currentTime = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  const [time, setTime] = useState(currentTime)
  const [weather, setWeather] = useState('晴转多云')
  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()),
      1000
    )
    getWeatherAPIData()
    return function cleanup() {
      clearInterval(timer)
    }
  }, [])

  const getWeatherAPIData = () => {
    // const url =
    //   'http://api.map.baidu.com/weather/v1/?district_id=310104&data_type=now&ak=NOlII9FY384nG6Z2zia86hEaYLKGAEzQ&output=json&callback=?'
    // axios.jsonp({ url, timeout: 999999 }).then((res) => {
    //   // console.log(res)
    //   setWeather()
    // })
    setWeather()
  }
  const { menuName } = props
  return (
    <div className={styles.header}>
      <Row className={[styles['header-top'], styles[menuType === 'second' ? 'simple-header' : '']]}>
        {menuType === 'second' ? (
          <Col span={6} className={styles['logo-wrapper']}>
            <Link to="/admin/dashboard">
              <img src={logo} />
            </Link>
          </Col>
        ) : (
          ''
        )}
        <Col span={menuType === 'second' ? 18 : 24}>
          <span>欢迎, 七月笙烟</span>
          <a>退出</a>
        </Col>
      </Row>
      {menuType === 'second' ? (
        ''
      ) : (
        <Row className={styles['breadcrumb']}>
          <Col span={4} className={styles['breadcrumb-title']}>
            <span>{menuName}</span>
          </Col>
          <Col span={20} className={styles['weather']}>
            <span className={styles['date']}>{time}</span>
            <span className={styles['weather-detail']}>{weather}</span>
          </Col>
        </Row>
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    menuName: state.getIn(['app', 'currentMenu'])
      ? state.getIn(['app', 'currentMenu'])
      : Cookie.get('CURRENT_MENU')
  }
}
export default connect(mapStateToProps)(Header)
