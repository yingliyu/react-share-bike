import React from 'react'
import { Card } from 'antd'
import styles from './index.module.less'
export default function Pie() {
  return (
    <div className={styles['bar-wrapper']}>
      <Card titl="饼图">This is Pie page</Card>
    </div>
  )
}
