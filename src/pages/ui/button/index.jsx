import React, { useState } from 'react'
import { Card, Button, Radio } from 'antd'
import {
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  VerticalAlignBottomOutlined
} from '@ant-design/icons'
import styles from './index.module.less'

export default () => {
  const [isLoading, setLoading] = useState(false)
  const [btnSize, setBtnSize] = useState('default')
  return (
    <div className={styles['ui-button-wrapper']}>
      <Card title="基础按钮" className={styles['card-wrapper']}>
        <Button>按钮</Button>
        <Button type="primary">按钮</Button>
        <Button type="danger">按钮</Button>
        <Button type="dashed">按钮</Button>
        <Button disabled>按钮</Button>
        <Button type="link">按钮</Button>
      </Card>
      <Card title="圆形按钮" className={styles['card-wrapper']}>
        <Button type="primary" icon={<PlusOutlined />}>
          创建
        </Button>
        <Button type="primary" icon={<EditOutlined />}>
          编辑
        </Button>
        <Button type="danger" icon={<DeleteOutlined />}>
          删除
        </Button>
        <Button shape="circle" icon={<SearchOutlined />} />

        <Button type="primary" icon={<VerticalAlignBottomOutlined />}>
          下载
        </Button>
        <Button type="primary" icon={<SearchOutlined />}>
          按钮
        </Button>
      </Card>
      <Card title="Loading按钮" className={styles['card-wrapper']}>
        <Button type="primary" loading>
          确定
        </Button>
        <Button type="primary" shape="circle" loading />
        <Button type="primary" loading>
          点击加载
        </Button>
        <Button shape="circle" loading />
        <Button type="primary" loading={isLoading} onClick={() => setLoading(!isLoading)}>
          点击关闭
        </Button>
      </Card>
      <Card title="按钮组" className={styles['btn-wrapper']}>
        <Radio.Group>
          <Radio.Button value="Back">
            <LeftOutlined />
            Back
          </Radio.Button>
          <Radio.Button value="Next">
            Next
            <RightOutlined />
          </Radio.Button>
        </Radio.Group>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Radio.Group>
          <Radio.Button value="Back">
            <LeftOutlined />
            Back
          </Radio.Button>
          <Radio.Button value="Next">
            Next
            <RightOutlined />
          </Radio.Button>
        </Radio.Group>
      </Card>
      <Card title="按钮尺寸" className={styles['card-wrapper']}>
        <Radio.Group>
          <Radio.Button value="small" onClick={() => setBtnSize('small')}>
            Small
          </Radio.Button>
          <Radio.Button value="default" onClick={() => setBtnSize('default')}>
            Default
          </Radio.Button>
          <Radio.Button value="large" onClick={() => setBtnSize('large')}>
            Large
          </Radio.Button>
        </Radio.Group>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Button type="primary" size={btnSize}>
          按钮
        </Button>
        <Button type="danger" size={btnSize}>
          按钮
        </Button>
        <Button type="dashed" size={btnSize}>
          按钮
        </Button>
      </Card>
    </div>
  )
}
