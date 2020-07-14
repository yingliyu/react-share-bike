import React from 'react'
import { Card } from 'antd'
import styles from './index.module.less'
export default function Bar() {
  return (
    <div className={styles['bar-wrapper']}>
      <Card titl="柱状图">bar page</Card>
    </div>
  )
}
