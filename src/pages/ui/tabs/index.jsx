import React, { useState } from 'react'
import { Card, Tabs, message } from 'antd'
import { AppleOutlined, AndroidOutlined, WindowsOutlined } from '@ant-design/icons'
import styles from './index.module.less'

export default () => {
  const { TabPane } = Tabs

  const initialPanes = [
    { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
    { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
    {
      title: 'Tab 3',
      content: 'Content of Tab 3',
      key: '3',
      closable: false
    }
  ]
  const [panes, setPanes] = useState(initialPanes)
  const [activeKey, setActiveKey] = useState('1')
  const [activeKey1, setActiveKey1] = useState('1')
  const [activeKey2, setActiveKey2] = useState('1')
  const [newTabIndex, setNewTabIndex] = useState(0)

  const callback = (key) => {
    setActiveKey(key)
    message.info(`hi,您选中了第${key}项`)
  }
  const onEdit = (targetKey, action) => {
    operate[action](targetKey)
  }
  const operate = {
    remove(key) {
      const newPanes = panes.filter((item) => item.key !== key.toString())
      setPanes(newPanes)
      setActiveKey(newPanes[newPanes.length - 1].key)
    },
    add() {
      setNewTabIndex(newTabIndex + 1)
      const activeKey = `newTab${newTabIndex}`
      const newPanes = [...panes]
      newPanes.push({ title: 'New Tab', content: 'Content of New Tab', key: activeKey })
      setActiveKey(activeKey)
      setPanes(newPanes)
    }
  }

  return (
    <div className={styles['ui-tabs-wrapper']}>
      <Card title="Tabs标签页" className={styles['card-wrapper']}>
        <Tabs activeKey={activeKey1} onChange={(key) => setActiveKey1(key)}>
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2" disabled>
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Card>
      <Card title="带图标的标签页" className={styles['card-wrapper']}>
        <Tabs activeKey={activeKey2} onChange={(key) => setActiveKey2(key)}>
          <TabPane
            tab={
              <span>
                <AppleOutlined />
                Tab1
              </span>
            }
            key="1"
          >
            Content of Tab Pane 1
          </TabPane>
          <TabPane
            tab={
              <span>
                <AndroidOutlined />
                Tab 2
              </span>
            }
            key="2"
          >
            Content of Tab Pane 2
          </TabPane>
          <TabPane
            tab={
              <span>
                <WindowsOutlined />
                Tab 2
              </span>
            }
            key="3"
          >
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Card>
      <Card title="动态标签页" className={styles['card-wrapper']}>
        <Tabs activeKey={activeKey} type="editable-card" onChange={callback} onEdit={onEdit}>
          {panes.map((item) => (
            <TabPane tab={item.title} key={item.key} closable={item.closable}>
              {item.content}
            </TabPane>
          ))}
        </Tabs>
      </Card>
    </div>
  )
}
