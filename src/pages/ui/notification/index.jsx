import React from 'react'
import { Card, Button, notification, Space } from 'antd'

import styles from './index.module.less'
export default function Notification() {
  const openNotification = (type, placement) => {
    notification[type]({
      message: '发工资了',
      placement,
      description: '上个月考勤22天，迟到0天，工资应发250，实发250，请笑纳！',
      onClick: () => {
        console.log('Notification Clicked!')
      }
    })
  }
  return (
    <div className={styles['ui-notification-wrapper']}>
      <Card title="通知提醒框" className={styles['card-wrapper']}>
        <Space>
          <Button type="primary" onClick={() => openNotification('success', 'topRight')}>
            success
          </Button>
          <Button type="primary" onClick={() => openNotification('warning', 'topRight')}>
            warning
          </Button>
          <Button type="primary" onClick={() => openNotification('info', 'topRight')}>
            info
          </Button>
          <Button type="primary" onClick={() => openNotification('open', 'topRight')}>
            open
          </Button>
          <Button type="danger" onClick={() => openNotification('error', 'topRight')}>
            error
          </Button>
        </Space>
      </Card>
      <Card title="自定义弹出方向" className={styles['card-wrapper']}>
        <Space>
          <Button type="primary" onClick={() => openNotification('success', 'topLeft')}>
            topLeft
          </Button>
          <Button type="primary" onClick={() => openNotification('warning', 'topRight')}>
            topRight
          </Button>
          <Button type="primary" onClick={() => openNotification('info', 'bottomLeft')}>
            bottomLeft
          </Button>
          <Button type="primary" onClick={() => openNotification('open', 'bottomRight')}>
            bottomRight
          </Button>
        </Space>
      </Card>
    </div>
  )
}
