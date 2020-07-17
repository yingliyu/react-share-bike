import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import styles from './index.module.less'
import Cookie from 'js-cookie'
import logo from './imgs/logo.png'
import { connect } from 'react-redux'
import { appActionCreators } from '@/store/action-creators'

function Header(props) {
  const getCurrentTime = () => {
    const time = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    return time
  }
  const currentTime = getCurrentTime()
  const [time, setTime] = useState(currentTime)
  const [weather, setWeather] = useState('晴转多云')
  useEffect(() => {
    const timer = setInterval(() => setTime(getCurrentTime()), 1000)
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
  const { menuName, switchMenu, menuType } = props
  const [, setSelectMenu] = useState([props.location.pathname])
  const handleClickLogo = () => {
    const path = '/admin/dashboard'
    props.history.push(path)
    setSelectMenu(path)
    switchMenu('首页')
    Cookie.set('CURRENT_MENU', '首页')
  }
  return (
    <div className={styles.header}>
      <Row className={[styles['header-top'], styles[menuType === 'second' ? 'simple-header' : '']]}>
        {menuType === 'second' ? (
          <Col span={6} className={styles['logo-wrapper']}>
            <img onClick={handleClickLogo} src={logo} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    switchMenu: (val) => dispatch(appActionCreators.switchMenu(val))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
