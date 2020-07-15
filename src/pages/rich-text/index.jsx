import React, { useState } from 'react'
import { Card, Button, Space, Modal } from 'antd'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import styles from './index.module.less'
export default function RichText() {
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))

  const getBraftContent = () => {
    // 将editorState数据转换成html字符串
    Modal.info({
      title: '富文本内容',
      content: editorState.toHTML()
    })
  }
  const handleBraftChange = (editorState) => {
    setEditorState(editorState)
  }
  const submitContent = () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = editorState.toHTML()
    console.log(htmlContent)
    // const result = await saveEditorContent(htmlContent)
  }

  return (
    <div className={styles['rich-text-wrapper']}>
      <Card title="富文本——braft-editor" className={styles['rich-text-inner']}>
        <div>
          <Space>
            <Button type="primary" onClick={getBraftContent}>
              获取富文本内容
            </Button>
          </Space>
        </div>
        <br />
        <BraftEditor
          className={styles['braft-editor']}
          value={editorState}
          contentStyle={{ height: 400, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
          onChange={handleBraftChange}
          onSave={submitContent}
        />
      </Card>
    </div>
  )
}
