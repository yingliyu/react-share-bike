import React from 'react'
import { Card } from 'antd'
import styles from './index.module.less'
export default function Line() {
  return (
    <div className={styles['bar-wrapper']}>
      <Card titl="折线图">This is line page！</Card>
    </div>
  )
}
