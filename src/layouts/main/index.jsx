import React from 'react'
import { Row, Col } from 'antd'
import './index.less'
import loadable from '@loadable/component'
const AsyncPage = loadable((props) => import(`@/components/${props.page}/index.jsx`))
// const Home = loadable((props) => import(`@/pages/dashboard/index.jsx`))
// import {RouterMain} from '@/routers'
export default function App(props) {
  console.log(props)
  return (
    <Row className="admin-wrapper">
      <Col span={3} className="nav-left">
        <AsyncPage {...props} page="nav-left" fallback={<div>Loading...</div>} />
      </Col>
      <Col span={21} className="main">
        <AsyncPage page="header" fallback={<div>Loading...</div>} />
        <Row className="content">{props.children}</Row>
        <AsyncPage page="footer" fallback={<div>Loading...</div>} />
      </Col>
    </Row>
  )
}
