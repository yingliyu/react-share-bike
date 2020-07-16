import React, { useEffect, useState } from 'react'
import { Card, Space, Button, Form, Input, Upload, Divider, notification } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import BraftEditor from 'braft-editor'
// import { FORM_LAYOUT } from '@/utils/constants'
// import editorUpload from '@/utils/editor-upload'

import appConfig from '@/config'

import 'braft-editor/dist/index.css'
import css from './index.module.less'

const { Item } = Form

export default function LittleToolEdit(props) {
  // const id = props.match.params.id;
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [desc, setDesc] = useState(BraftEditor.createEditorState(null))
  const [intro, setIntro] = useState(BraftEditor.createEditorState(null))

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">上传</div>
    </div>
  )

  // 页面加载时获取编辑信息
  useEffect(() => {
    if (props.match.params.id) {
      const temp = localStorage.getItem(`little_tool_${props.match.params.id}`)
      if (temp) {
        const content = JSON.parse(temp)
        setAvatar(content.avatarStr)
        form.setFieldsValue({
          toolName: content.toolName,
          software: content.software,
          note: content.note,
          result: content.result,
          avatar: [{ url: content.avatarStr }]
        })
        setDesc(BraftEditor.createEditorState(content.desc))
        setIntro(BraftEditor.createEditorState(content.intro))
      }
    }
  }, [form, props.match.params.id])

  const normFile = (e) => {
    console.log('Upload event:', e)

    if (Array.isArray(e)) {
      return e
    }

    return e && e.fileList
  }

  const editorFile = (e) => {
    return e
  }

  const beforeUpload = (file) => {}

  const handleAvatarChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setLoading(false)
      setAvatar(info.file.response.data)
    }
  }

  const onBackClick = () => {
    props.history.goBack()
  }

  const onSaveClick = () => {
    form.submit()
  }

  const handleSubmit = (values) => {
    const postData = Object.assign(values, {
      desc: values.desc.toHTML(),
      intro: values.intro.toHTML(),
      avatarStr: avatar
    })
    localStorage.setItem(`little_tool_${props.match.params.id || 'new'}`, JSON.stringify(postData))
    notification.success({ message: '保存成功' })
    props.history.push(`/admin/tool/little/preview/${props.match.params.id || 'new'}`)
  }

  const handleDescChange = (val) => {
    setDesc(val)
  }

  const handleIntroChange = (val) => {
    setIntro(val)
  }

  return (
    <div className={css['little-tool-edit-wrapper']}>
      <Card
        title={props.match.params.id ? '小工具编辑' : '新增小工具'}
        extra={
          <Space>
            <Button onClick={onBackClick}>返回</Button>
            <Button type="primary" onClick={onSaveClick}>
              保存
            </Button>
          </Space>
        }
      >
        <Form form={form} onFinish={handleSubmit}>
          <Item
            name="toolName"
            label="工具名"
            rules={[{ required: true, message: '请输入工具名！' }]}
          >
            <Input allowClear className="input-500" />
          </Item>
          <Item label="贡献者照片" required>
            <Item
              name="avatar"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
              rules={[{ required: true, message: '请选择贡献者照片' }]}
            >
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={appConfig.uploadUrl}
                beforeUpload={beforeUpload}
                onChange={handleAvatarChange}
              >
                {avatar ? (
                  <img src={avatar} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Item>
          </Item>
          <Item
            name="software"
            label="使用软件"
            rules={[{ required: true, message: '请输入使用软件！' }]}
          >
            <Input allowClear className="input-500" />
          </Item>
          <Item
            label="功能介绍"
            name="desc"
            required
            getValueFromEvent={editorFile}
            valuePropName="editorState"
            validateTrigger="onBlur"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || value.isEmpty()) {
                    return Promise.reject(new Error('请输入功能介绍！'))
                  } else {
                    return Promise.resolve()
                  }
                }
              }
            ]}
          >
            <BraftEditor
              // media={{ uploadFn: editorUpload }}
              className={css['editor']}
              value={desc}
              onChange={handleDescChange}
            />
          </Item>
          <Item
            name="note"
            label="注意事项"
            rules={[{ required: true, message: '请输入注意事项！' }]}
          >
            <Input.TextArea allowClear autoSize={{ minRows: 5 }} />
          </Item>
          <Item
            label="使用说明"
            name="intro"
            required
            getValueFromEvent={editorFile}
            valuePropName="editorState"
            validateTrigger="onBlur"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || value.isEmpty()) {
                    return Promise.reject(new Error('请输入使用说明！'))
                  } else {
                    return Promise.resolve()
                  }
                }
              }
            ]}
          >
            <BraftEditor
              // media={{ uploadFn: editorUpload }}
              className={css['editor']}
              value={intro}
              onChange={handleIntroChange}
            />
          </Item>
          <Item
            name="result"
            label="结果说明"
            rules={[{ required: true, message: '请输入结果说明！' }]}
          >
            <Input.TextArea allowClear autoSize={{ minRows: 5 }} />
          </Item>
        </Form>
        <Divider />
        <div className={css['footer-wrapper']}>
          <Button type="primary" onClick={onSaveClick}>
            保存
          </Button>
        </div>
      </Card>
    </div>
  )
}
