import React from 'react'
import { Row, Col } from 'antd'
import './index.less'
import Util from '../../utils/formate-date'
import axios from '../../utils/axios'
export default class Header extends React.Component{
  state = {}
  componentDidMount() {
    this.setState({
      userName: 'lemon'
    })
    setInterval(() => {
      let sysTime = Util.formatDate(new Date().getTime())
      this.setState({
        sysTime
      })
    }, 1000)

    this.getWheather()
  }
  getWheather(){
    axios.jsonp({url:'http://api.map.baidu.com/telematics/v3/weather?location=shanghai&output=JSON&ak={百度AK}'})
      .then(res => {
        console.log(res)
        if(res.status === 'success'){
          let data = res.results[0].weather_data[0]
          this.setState({
            dayPictureUrl: data.dayPictureUrl,
            weather: data.weather
          })
        }
      })
  }
  render() {
    return (
      <div className='header'>
        <Row className='header-top'>
          <Col span={24}>
            <span>欢迎, yyl</span>
            <a>退出</a>
          </Col>
        </Row>
        <Row className='breadcrumb'>
          <Col span={4} className='breadcrumb-title'>
            首页
          </Col>
          <Col span={20} className='weather'>
            <span className='date'>{this.state.sysTime}</span>
            <span className='weather-detail'>晴转多云</span>
          </Col>
        </Row>
      </div>
    )
  }
}