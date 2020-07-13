import React from 'react'
import { Input, Select, Form, Button, Checkbox, DatePicker, Col, Row, Space } from 'antd'
import styles from './index.module.less'

export default function BaseForm(props) {
  const [form] = Form.useForm()
  const { formList, initialValues } = props

  const getInitForm = () => {
    if (formList && formList.length) {
      const children = []

      for (let i = 0; i < formList.length; i++) {
        children.push(
          <Col span={8} key={i}>
            <Form.Item name={formList[i].name} label={formList[i].label} key={i}>
              {(() => {
                const type = formList[i].type
                switch (type) {
                  case 'SELECT':
                    return (
                      <Select
                        // style={{ width: formList[i].width }}
                        placeholder={formList[i].placeholder}
                      >
                        {getOptionList(formList[i].list)}
                      </Select>
                    )
                  case 'CHECKBOX':
                    return <Checkbox>{formList[i].label}</Checkbox>
                  case 'INPUT':
                    return <Input placeholder={formList[i].placeholder} />
                  case 'DATEPICKER':
                    return <DatePicker.RangePicker showTime />
                  default:
                    return ''
                }
              })()}
            </Form.Item>
          </Col>
        )
      }
      return children
    }
  }
  const getOptionList = (data) => {
    if (!data) {
      return []
    }
    let options = []
    data.map((item) =>
      options.push(
        <Select.Option value={item.id} key={item.id}>
          {item.name}
        </Select.Option>
      )
    )
    return options
  }
  const onFinish = (values) => {
    props.submitHandle(values)
    console.log('Received values of form: ', values)
  }
  const onReset = () => {
    form.setFieldsValue({
      ...initialValues
    })
  }
  return (
    <div className={styles['base-form-wrapper']}>
      <Form
        initialValues={initialValues}
        form={form}
        name="baseForm"
        className={styles['base-form-wrapper']}
        onFinish={onFinish}
      >
        <Row gutter={24}>{getInitForm()}</Row>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button onClick={onReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
