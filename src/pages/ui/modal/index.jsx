import React, { useState } from 'react'
import { Card, Button, Modal } from 'antd'

import styles from './index.module.less'
export default () => {
  const [visible11, setVisible11] = useState(false)
  const [visible12, setVisible12] = useState(false)
  const [visible13, setVisible13] = useState(false)
  const [visible14, setVisible14] = useState(false)

  const handleOk = () => {
    console.log('ok')
    setVisible11(false)
  }
  const handleConfirm = (type) => {
    Modal[type]({
      title: '确认?',
      content: '你确定学会React了吗?',
      onOk() {
        console.log('ok')
      },
      onCancel() {
        console.log('cancle')
      }
    })
  }
  return (
    <div className={styles['ui-modal-wrapper']}>
      <Card title="基础模态框">
        <Button type="primary" onClick={() => setVisible11(true)}>
          Open
        </Button>
        <Button type="primary" onClick={() => setVisible12(true)}>
          自定义页脚
        </Button>
        <Button type="primary" onClick={() => setVisible13(true)}>
          顶部20px弹框
        </Button>
        <Button type="primary" onClick={() => setVisible14(true)}>
          水平垂直居中
        </Button>
      </Card>
      <Modal
        title="React Hook"
        visible={visible11}
        onOk={handleOk}
        onCancel={() => setVisible11(false)}
      >
        <p>Welcome to React world !!!</p>
      </Modal>
      <Modal
        visible={visible12}
        title="名句"
        onOk={() => setVisible12(false)}
        onCancel={() => setVisible12(false)}
        okText="可以的"
        cancelText="算了吧"
      >
        <p>给我一个支点我能撬动整个地球 !!!</p>
      </Modal>
      <Modal
        title="React Hook"
        style={{ top: 20 }}
        visible={visible13}
        onOk={() => setVisible13(false)}
        onCancel={() => setVisible13(false)}
      >
        <p>Welcome to React world !!!</p>
      </Modal>
      <Modal
        centered
        visible={visible14}
        title="名句"
        onOk={() => setVisible14(false)}
        onCancel={() => setVisible14(false)}
        okText="可以的"
        cancelText="算了吧"
      >
        <p>给我一个支点我能撬动整个地球 !!!</p>
      </Modal>
      <Card title="信息确认框">
        <Button type="primary" onClick={() => handleConfirm('confirm')}>
          Confirm
        </Button>
        <Button type="default" onClick={() => handleConfirm('info')}>
          Info
        </Button>
        <Button type="primary" onClick={() => handleConfirm('success')}>
          Success
        </Button>
        <Button type="primary" onClick={() => handleConfirm('error')}>
          Error
        </Button>
        <Button type="danger" onClick={() => handleConfirm('warning')}>
          Warning
        </Button>
      </Card>
    </div>
  )
}
