import React from 'react'
import { Card, Spin, Space, Alert } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import styles from './index.module.less'
export default function Loading() {
  return (
    <div className={styles['ui-loading-wrapper']}>
      <Card title="Spin的用法" className={styles['card-wrapper']}>
        <Space>
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
          <Spin indicator={<LoadingOutlined />} />
        </Space>
      </Card>
      <Card title="内容遮罩" className={styles['card-wrapper']}>
        <Space direction="vertical">
          <Spin>
            <Alert
              message="Alert message title"
              description="Further details about the context of this alert."
              type="info"
            />
          </Spin>
          <Spin tip="拼命加载中...">
            <Alert
              showIcon
              message="Alert message title"
              description="Further details about the context of this alert."
              type="warning"
            />
          </Spin>

          <Spin tip="Loading...">
            <Alert
              showIcon
              closable
              message="Alert message title"
              description="Further details about the context of this alert."
              type="success"
            />
          </Spin>
          <Spin indicator={<LoadingOutlined />}>
            <Alert
              showIcon
              closable
              message="Alert message title"
              description="Further details about the context of this alert."
              type="error"
            />
          </Spin>
        </Space>
      </Card>
    </div>
  )
}
