import React from 'react'
import { Row, Col } from 'antd'
import Header from '@/components/header/index.jsx'
import Footer from '@/components/footer/index.jsx'
import NavLeft from '@/components/nav-left/index.jsx'
import Home from '@/pages/home/index.jsx'
import './index.less'

export default class App extends React.Component {
  render() {
    return (
      <Row className="admin-wrapper">
        <Col span={3} className="nav-left">
          <NavLeft />
        </Col>
        <Col span={21} className="main">
          <Header />
          <Row className="content">
            <Home />
            {/* {this.props.childern} */}
          </Row>
          <Footer />
        </Col>
      </Row>
    )
  }
}
