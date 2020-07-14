import React from 'react'
import { Card, Steps } from 'antd'
import styles from './index.module.less'
export default function Bar() {
  const { Step } = Steps
  return (
    <div className={styles['bar-wrapper']}>
      <Card title="柱状图">
        <Steps current={1}>
          <Step title="Finished" description="This is a description." />
          <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
          <Step title="Waiting" description="This is a description." />
        </Steps>
      </Card>
      <Card title="柱状图">
        <Steps current={1}>
          <Step title="Finished" />
          <Step title="In Progress" subTitle="Left 00:00:08" />
          <Step title="Waiting" />
        </Steps>
      </Card>
    </div>
  )
}
