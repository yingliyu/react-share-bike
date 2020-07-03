import React from 'react'
import { Card, Carousel } from 'antd'
import styles from './index.module.less'
export default () => {
  return (
    <div className={styles['ui-caousel-wrapper']}>
      <Card title="基础轮播图" className={styles['base-carousel-wrapper']}>
        <Carousel>
          <div>
            <h3>Antd Motion Banner - React</h3>
          </div>
          <div>
            <h3>Antd Motion Banner - Vue</h3>
          </div>
          <div>
            <h3>Antd Motion Banner - Angular</h3>
          </div>
        </Carousel>
      </Card>
      <Card title="图片轮播" className={styles['img-carousel-wrapper']}>
        <Carousel autoplay>
          <div>
            <img src={require('../gallery/imgs/10.png')} />
          </div>
          <div>
            <img src={require('../gallery/imgs/11.png')} />
          </div>
          <div>
            <img src={require('../gallery/imgs/12.png')} />
          </div>
        </Carousel>
      </Card>
    </div>
  )
}
