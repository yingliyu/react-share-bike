import React from 'react'
import { Row, Col } from 'antd'
import Header from './components/header'
import Footer from './components/footer'
import NavLeft from './components/nav-left'
import './app.less'

export default class App extends React.Component {

  render() {
    return (
      <Row className='admin-wrapper'>
        <Col span={3} className='nav-left'>
          <NavLeft />
        </Col>
        <Col span={21} className='main'>
          <Header />
          <Row className='content'>
              content
            {/* {this.props.childern} */}
          </Row>
          <Footer />
        </Col>
      </Row>
    )
  }
}