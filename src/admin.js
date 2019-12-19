import React from 'react'
import { Row, Col} from 'antd'
import Header from './components/header'
import Footer from './components/footer'
import NavLeft from './components/nav-left'

export default class Admin extends React.Component{

  render() {
    return (
      <div>
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
      </div>
    )
  }
}