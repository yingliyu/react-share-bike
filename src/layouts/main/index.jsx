import React from 'react'
import { Row, Col } from 'antd'
import styles from './index.module.less'
import loadable from '@loadable/component'
const AsyncPage = loadable((props) => import(`@/components/${props.page}/index.jsx`))
export default function App(props) {
  return (
    <Row className={styles['admin-wrapper']}>
      <Col span={3} className={styles['nav-left']}>
        {/* 左侧导航 */}
        <AsyncPage {...props} page="nav-left" fallback={<div>Loading...</div>} />
      </Col>
      <Col span={21} className={styles['main']}>
        {/* 头部 */}
        <AsyncPage page="header" fallback={<div>Loading...</div>} />
        {/* main */}
        <Row className={styles['content']}>{props.children}</Row>
        {/* 底部 */}
        <AsyncPage page="footer" fallback={<div>Loading...</div>} />
      </Col>
    </Row>
  )
}
