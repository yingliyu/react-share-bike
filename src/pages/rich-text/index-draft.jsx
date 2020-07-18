import React, { useState } from 'react'
import { Card, Button, Space, Modal } from 'antd'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import styles from './index.module.less'
export default function RichText() {
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty())
  const onEditorStateChange = (editorState) => {
    console.log(editorState)
    setEditorContent(editorState)
  }

  const clearContentHandle = () => {
    setEditorContent()
  }
  const getContentHandle = () => {
    Modal.info({
      title: '富文本内容',
      content: draftToHtml(convertToRaw(editorContent.getCurrentContent()))
    })
  }

  return (
    <div className={styles['rich-text-wrapper']}>
      <Card title="富文本——react-draft-wysiwyg" className={styles['rich-text-inner']}>
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
          editorState={editorContent}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            urlEnabled: true,
            uploadEnabled: true
          }}
        />
      </Card>
    </div>
  )
}
