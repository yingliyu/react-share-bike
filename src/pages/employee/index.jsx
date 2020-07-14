import React, { useState, useEffect } from 'react'
import {
  Card,
  Table,
  message,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Select,
  DatePicker
} from 'antd'
import moment from 'moment'
import { PlusOutlined } from '@ant-design/icons'
import QueryForm from '@/components/query-form'
import { employeeApi } from '@/services'
import styles from './index.module.less'
// import QueryTab from '@/components/query-table'
export default function CityManage() {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [id, setId] = useState()
  const [operateType, setOperateType] = useState('create')
  const [selectedParams, setSelectedParams] = useState({
    selectedRowKeys: '',
    selectedItems: []
  })
  const [form] = Form.useForm()
  const initialValues = {
    userName: '',
    sex: '',
    status: '',
    birthday: '',
    address: ''
  }
  // const [orderId, setOrderId] = useState()
  useEffect(() => {
    initData()
  }, [currentPage, pageSize])
  const initData = async (params) => {
    try {
      const res = await employeeApi.getEmployeeList(params)
      setList(res.list)
      setTotal(res.total)
    } catch (error) {
      message.error(error)
    }
  }
  const formItemlayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 12
    }
  }
  // const getData = async (params) => {
  //   try {
  //     const res = await employeeApi.getEmployeeList(params)
  //     return res
  //   } catch (error) {
  //     message.error(error)
  //   }
  // }
  const columns = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'id'
    },
    {
      title: '用户名',
      key: 'userName',
      dataIndex: 'userName'
    },
    {
      title: '爱好',
      key: 'insterest',
      dataIndex: 'insterest',
      ellipsis: true
    },
    {
      title: '生日',
      key: 'birthday',
      dataIndex: 'birthday'
    },
    {
      title: '联系地址',
      key: 'address',
      dataIndex: 'address'
    },
    {
      title: '性别',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        switch (status) {
          case 0:
            return '男'
          case 1:
            return '女'
        }
      }
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        switch (status) {
          case 0:
            return '进行中'
          case 1:
            return '进行中（临时停车）'
          case 2:
            return '行程结束'
        }
      }
    },
    {
      title: '早起时间',
      key: 'time',
      dataIndex: 'time'
    },
    {
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          <Space>
            <Button type="primary" onClick={() => editHandle(record.id)}>
              编辑
            </Button>
            <Button type="danger" onClick={() => deleteHandle(record.id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  const addEmployeeHandle = () => {
    console.log('创建员工')
    setAddModalVisible(true)
  }

  const editHandle = (rows) => {
    console.log('编辑===', rows)
    setOperateType('edit')
    setAddModalVisible(true)
    employeeDetail()
  }
  const employeeDetail = async () => {
    try {
      const res = await employeeApi.getEmployeeDetail({ id: id })
      console.log(res)
      form.setFieldsValue({
        ...res,
        birthday: moment('1972-05-03'),
        sex: res.sex.toString()
      })
    } catch (error) {
      console.log(error)
    }
  }
  const deleteHandle = (rows) => {
    console.log('删除===', rows)
    Modal.confirm({
      title: '删除员工提示',
      content: '确认删除吗？',
      async onOk() {
        console.log('ok')
        try {
          const res = await employeeApi.deleteEmployee({ id: id })
          console.log(res)
          initData()
        } catch (error) {
          console.log(error)
        }
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }
  const changePageHandle = (current) => {
    setCurrentPage(current)
  }
  const onShowSizeChangeHandle = (current, size) => {
    setPageSize(size)
  }
  const searchFormDefaultValues = {
    userName: '',
    phone: '',
    time: []
  }
  const formList = [
    {
      type: 'INPUT',
      label: '用户名',
      name: 'userName',
      placeholder: '请输入用户名',
      initVal: '',
      width: 200
    },
    {
      type: 'INPUT',
      label: '手机号',
      name: 'phone',
      placeholder: '请输入用户的手机号',
      initVal: '',
      width: 200
    },
    {
      type: 'DATEPICKER',
      label: '入职时间',
      name: 'time'
    }
  ]
  const dateFormat = 'YYYY-MM-DD HH:mm:ss'
  const handleSearchSubmit = (values) => {
    const params = {
      userName: values.userName,
      phone: values.phone,
      startTime: values.time && values.time[0] ? values.time[0].format(dateFormat) : '',
      endTime: values.time && values.time[1] ? values.time[1].format(dateFormat) : ''
    }
    console.log(params)
    initData(params)
    // getData(params)
  }

  const okHandle = async () => {
    try {
      console.log(operateType)
      const values = await form.validateFields()
      console.log('Success:', values)
      initData()
      form.setFieldsValue({
        userName: '',
        sex: '',
        status: '',
        birthday: '',
        addresss: ''
      })
      setAddModalVisible(false)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const onCancel = () => {
    form.setFieldsValue({
      userName: '',
      sex: '',
      status: '',
      birthday: '',
      address: ''
    })
    setAddModalVisible(false)
  }
  const rowSelections = {
    type: 'Radio',
    selectedRowKeys: selectedParams.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setId(selectedRows[0].id)
      setSelectedParams({
        selectedRowKeys: selectedRowKeys,
        selectedItems: selectedRows
      })
    }
  }
  return (
    <div className={styles['user-manage-wrapper']}>
      <Card>
        <QueryForm
          submitHandle={handleSearchSubmit}
          formList={formList}
          initialValues={searchFormDefaultValues}
        />
      </Card>
      {/* <Card title="表格组件">
        <QueryTab initData={getData} columns={columns} />
      </Card> */}

      <Card>
        <div className={styles['btn-order-wrapper']}>
          <Space>
            <Button type="primary" onClick={addEmployeeHandle}>
              <PlusOutlined />
              创建员工
            </Button>
            <Button type="primary" onClick={addEmployeeHandle}>
              员工详情
            </Button>
          </Space>
        </div>
        <br />
        <Table
          bordered
          rowSelection={rowSelections}
          dataSource={list}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showTotal: (total) => `共 ${total} 条`,
            onChange: (current) => changePageHandle(current),
            onShowSizeChange: (current, size) => onShowSizeChangeHandle(current, size)
          }}
        />
      </Card>

      <Modal
        title={operateType === 'create' ? '创建员工' : '编辑员工信息'}
        visible={addModalVisible}
        onOk={okHandle}
        onCancel={onCancel}
      >
        <Form initialValues={initialValues} form={form} {...formItemlayout}>
          <Form.Item
            label="姓名"
            name="userName"
            rules={[
              {
                required: true,
                message: 'Please input your name'
              }
            ]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item label="性别" name="sex">
            <Radio.Group>
              <Radio value="1" key="1">
                男
              </Radio>
              <Radio value="0" key="0">
                女
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="状态" name="status">
            <Select>
              <Select.Option value="1" key="1">
                风华浪子
              </Select.Option>
              <Select.Option value="2" key="2">
                咸鱼一条
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="生日" name="birthday">
            <DatePicker name="birthday" />
          </Form.Item>
          <Form.Item label="联系地址" name="address">
            <Input.TextArea placeholder="请输入联系地址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
