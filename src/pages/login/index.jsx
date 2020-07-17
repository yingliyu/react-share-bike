import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './index.module.less'

export default (props) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
  }
  const onFinish = (values) => {
    if (values.username === 'admin' && values.password === '123456') {
      message.success(`${values.username}恭喜你，登录成功！！！`)
      setTimeout(() => props.history.push('/admin/dashboard'), 1000)
    }
  }

  const onFinishFailed = (errorInfo) => {
    message.error('Failed:', errorInfo)
  }
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({})
  }, [])
  return (
    <div className={styles['login-wrapper']}>
      <Card title="登录行内表单">
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { pattern: /^\w+$/g, message: '用户名必须为英文字母或数字' }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 5, max: 10, message: '长度不在范围内' },
              { pattern: /^\d/g, message: '密码必须为数字开头' }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            {() => (
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
      <Card title="登录水平表单" className={styles['vertical-form-wrapper']}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: 500 }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              忘记密码
            </a>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
