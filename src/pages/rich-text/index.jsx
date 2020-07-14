import React, { useState } from 'react'
import { Card, Button, Space, Modal } from 'antd'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import styles from './index.module.less'
export default function RichText() {
  // 第1种富文本
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))
  const clearBraftContent = () => {
    setEditorState(BraftEditor.createEditorState(null))
  }
  const getBraftContent = () => {
    console.log(editorState)
    // 将editorState数据转换成html字符串
    const htmlString = editorState.toHTML()
    console.log(htmlString)

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

  // 第2种富文本
  const [editorState1, setEditorState1] = useState(EditorState.createEmpty())
  const onEditorStateChange = (editorState) => {
    console.log(editorState)
    setEditorState1(editorState)
  }

  const clearContentHandle = () => {
    setEditorState()
  }
  const getContentHandle = () => {
    Modal.info({
      title: '富文本内容',
      content: draftToHtml(convertToRaw(editorState1.getCurrentContent()))
    })
  }

  return (
    <div className={styles['rich-text-wrapper']}>
      <Card title="富文本（一）-braft-editor" className={styles['rich-text-inner']}>
        <div>
          <Space>
            <Button type="primary" onClick={clearBraftContent}>
              清空内容
            </Button>
            <Button type="primary" onClick={getBraftContent}>
              获取富文本内容
            </Button>
          </Space>
        </div>
        <br />
        <BraftEditor
          className={styles['braft-editor']}
          value={editorState}
          onChange={handleBraftChange}
          onSave={submitContent}
        />
      </Card>
      <Card title="富文本（二）-react-draft-wysiwyg" className={styles['rich-text-inner']}>
        <div>
          <Space>
            <Button type="primary" onClick={clearContentHandle}>
              清空内容
            </Button>
            <Button type="primary" onClick={getContentHandle}>
              获取富文本内容
            </Button>
          </Space>
        </div>
        <br />
        <Editor
          editorState={editorState1}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
      </Card>
    </div>
  )
}
