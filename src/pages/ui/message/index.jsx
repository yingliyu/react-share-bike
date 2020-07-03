import React from 'react'
import { Card, Button, message, Space } from 'antd'
import styles from './index.module.less'
export default function Message() {
  const openMessage = (type, content) => {
    message[type](content)
  }
  message.config({
    top: 10,
    duration: 2,
    maxCount: 2,
    rtl: false
  })
  return (
    <div className={styles['ui-message-wrapper']}>
      <Card title="全局提示框" className={styles['card-wrapper']}>
        <Space>
          <Button
            type="primary"
            onClick={() => openMessage('success', 'This is success message!!!')}
          >
            success
          </Button>
          <Button
            type="primary"
            onClick={() => openMessage('warning', 'This is warning message!!!')}
          >
            warning
          </Button>
          <Button type="primary" onClick={() => openMessage('info', 'This is noraml message!!!')}>
            info
          </Button>
          <Button
            type="primary"
            onClick={() => openMessage('loading', 'This is loading message!!!')}
          >
            loading
          </Button>
          <Button type="primary" onClick={() => openMessage('error', 'This is error message!!!')}>
            error
          </Button>
        </Space>
      </Card>
    </div>
  )
}
