import React, { useState } from 'react'
import { Card, Row, Col, Modal } from 'antd'
import styles from './index.module.less'
export default () => {
  const { Meta } = Card
  const [visible, setVisible] = useState(false)
  const [url, setUrl] = useState('')
  const imgs = [
    ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
    ['7.png', '8.png', '9.png', '10.png', '11.png', '12.png'],
    ['13.png', '14.png', '15.png', '16.png', '17.png', '18.png']
  ]
  const clickHandle = (url) => {
    setUrl(url)
    setVisible(true)
  }
  const imgList = imgs.map((list) =>
    list.map((item) => (
      <Card
        onClick={() => clickHandle(require(`./imgs/${item}`))}
        key={item}
        cover={<img src={require(`./imgs/${item}`)} />}
      >
        <Meta title="Lilliab Blog" description="http://blog.lillian.fun" />
      </Card>
    ))
  )
  console.log(imgList)
  return (
    <div className={styles['ui-gallery-wrapper']}>
      <Row gutter={10}>
        <Col className="gutter-row" span={4}>
          {imgList[0]}
        </Col>
        <Col className="gutter-row" span={4}>
          {imgList[1]}
        </Col>
        <Col className="gutter-row" span={4}>
          {imgList[2]}
        </Col>
        <Col className="gutter-row" span={4}>
          {imgList[1]}
        </Col>
        <Col className="gutter-row" span={4}>
          {imgList[2]}
        </Col>
        <Col className="gutter-row" span={4}>
          {imgList[1]}
        </Col>
      </Row>
      <Modal title="图片画廊" visible={visible} footer={null} onCancel={() => setVisible(false)}>
        <img width={400} src={url} />
      </Modal>
    </div>
  )
}
