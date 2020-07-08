import React, { useState } from 'react'
import styles from './index.module.less'
import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Button,
  Radio,
  Checkbox,
  Card,
  Select,
  Switch,
  DatePicker,
  Upload,
  message,
  TimePicker
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
export default (props) => {
  // console.log(moment().get('year')) // 年
  const { Option } = Select
  const { TextArea } = Input
  // const RadioGroup = Radio.Group

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }
  const formItemLayout = {
    wrapperCol: {
      offset: 6,
      span: 18
    }
  }
  const [time, setTime] = useState('00:00:00')
  const [imageUrl, setImgUrl] = useState('')
  const [sex, setSex] = useState(1)
  const [loading, setLoading] = useState(false)

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString)
  }

  const onChangeTimer = (time, timeString) => {
    console.log(time, timeString)
    setTime(timeString)
  }
  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const handleChangeUpload = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImgUrl(imageUrl)
        setLoading(false)
      })
    }
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  )
  const onFinish = (fileList) => {
    console.log('Success:', fileList)
  }
  const onRadioChange = (e) => {
    setSex(e.target.value)
    // console.log(e)
  }
  return (
    <div className={styles['reg-wrapper']}>
      <Card title="注册表单">
        <Form
          {...layout}
          initialValues={{
            currentStatus: '2',
            married: 'checked',
            age: 10,
            time: moment(time, 'HH:mm:ss')
          }}
          onFinish={onFinish}
          style={{ width: '80%' }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!'
              }
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!'
              }
            ]}
          >
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item label="性别" name="sex">
            <Radio.Group onChange={onRadioChange} value={sex}>
              <Radio value="0">男</Radio>
              <Radio value="1">女</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="年龄" name="age">
            <InputNumber min={1} max={100} />
          </Form.Item>
          <Form.Item label="当前状态" name="currentStatus">
            <Select style={{ width: 120 }}>
              <Option value="1">咸鱼一条</Option>
              <Option value="2">风华浪子</Option>
              <Option value="3">创业者</Option>
              <Option value="4">江南才子</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="favourite"
            label="爱好"
            rules={[
              {
                required: true,
                message: 'Please select your favourite colors!',
                type: 'array'
              }
            ]}
          >
            <Select mode="multiple" placeholder="请选择你的爱好">
              <Option value="sing">唱歌</Option>
              <Option value="dance">跳舞</Option>
              <Option value="kongfu">中国功夫</Option>
              <Option value="run">跑步</Option>
              <Option value="pashan">爬山</Option>
              <Option value="biker">骑行</Option>
            </Select>
          </Form.Item>
          <Form.Item name="married" label="是否婚配" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="checkbox-group" label="Checkbox.Group">
            <Checkbox.Group>
              <Row>
                <Col span={8}>
                  <Checkbox
                    value="C"
                    style={{
                      lineHeight: '32px'
                    }}
                  >
                    C
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="D"
                    style={{
                      lineHeight: '32px'
                    }}
                  >
                    D
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="E"
                    style={{
                      lineHeight: '32px'
                    }}
                  >
                    E
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="F"
                    style={{
                      lineHeight: '32px'
                    }}
                  >
                    F
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="生日" name="birthday">
            <DatePicker onChange={onChangeDate} />
          </Form.Item>
          <Form.Item label="联系地址" name="address">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="早起时间" name="time">
            <TimePicker onChange={onChangeTimer} />
          </Form.Item>
          <Form.Item label="头像" name="headImg">
            <Upload
              name="avatar"
              listType="picture-card"
              className={styles['avatar-uploader']}
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChangeUpload}
              multiple={false}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item label="" {...formItemLayout}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
