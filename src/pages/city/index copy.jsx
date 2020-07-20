import React, { useState, useEffect } from 'react'
import { Card, Form, Select, Button, Table, Modal, Space } from 'antd'
import styles from './index.module.less'
import { cityApi } from '@/services'
export default function CityManage() {
  const columns = [
    {
      title: '城市ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '城市',
      dataIndex: 'cityName',
      key: 'cityName'
    },
    {
      title: '用车模式',
      dataIndex: 'useBikeMode',
      key: 'useBikeMode',
      render(mode) {
        return mode === 1 ? '用车模式1' : '用车模式2'
      }
    },
    {
      title: '运营模式',
      dataIndex: 'operateMode',
      key: 'operateMode',
      render(mode) {
        return mode === 1 ? '运营模式1' : '运营模式2'
      }
    },
    {
      title: '加盟商',
      dataIndex: 'franchisees',
      key: 'franchisees'
    },
    {
      title: '城市管理员',
      dataIndex: 'cityManager',
      key: 'cityManager',
      render(users) {
        return users.map((item) => item.name).join('、')
      }
    },
    {
      title: '开放时间',
      dataIndex: 'openTime',
      key: 'openTime'
    },
    {
      title: '操作时间',
      dataIndex: 'operateTime',
      key: 'operateTime'
    },
    {
      title: '操作员',
      dataIndex: 'operator',
      key: 'operator'
    }
  ]
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 }
  }
  const btnWrapperLayout = {
    wrapperCol: {
      span: 16,
      offset: 8
    }
  }
  const searchFormValues = {
    cityName: '',
    useBikeMode: '',
    operateMode: '',
    authStatus: ''
  }
  const modalFormValues = {
    cityName: '',
    useBikeMode: '',
    operateMode: ''
  }
  // const [form] = Form.useForm()
  // const [, forceUpdate] = useState()

  const [openList, setOpenList] = useState([])
  const [listTotal, setListTotal] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [openCityVisiable, setOpenCityVisiable] = useState(false)

  // To disable submit button at the beginning.
  // useEffect(() => {
  // forceUpdate({})
  // }, [])
  useEffect(() => {
    getOpenCityList()
  }, [currentPage, pageSize])
  // 获取开通城市列表
  const getOpenCityList = async (params) => {
    try {
      const res = await cityApi.getOpenCityList(params)
      // console.log(res)
      setOpenList(res.list)
      setListTotal(res.total)
      setCurrentPage(res.setCurrentPage)
      setPageSize(res.setPageSize)
    } catch (error) {
      console.log(error)
    }
  }
  const handleClickOpenCity = () => {
    setOpenCityVisiable(true)
  }
  // 城市开通api
  const handleOpenCitySubmit = async (fileList) => {
    try {
      await cityApi.openCity(fileList)
      setOpenCityVisiable(false)
      getOpenCityList()
      Modal.success({ content: '开通成功！' })
    } catch (error) {
      console.log(error)
    }
  }
  // 查询
  const handleSearchSubmit = (fileList) => {
    console.log(fileList)
    const params = {
      ...fileList,
      currentPage,
      pageSize
    }
    getOpenCityList(params)
  }
  const changePageHandle = (current) => {
    setCurrentPage(current)
  }
  const onShowSizeChangeHandle = (current, size) => {
    setPageSize(size)
  }
  return (
    <div className={styles['city-manage-wrapper']}>
      <Card>
        <Form layout="inline" onFinish={handleSearchSubmit} initialValues={searchFormValues}>
          <Form.Item label="城市" name="cityName">
            <Select style={{ width: 120 }} placeholder="请选择">
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="北京市">北京市</Select.Option>
              <Select.Option value="上海市">上海市</Select.Option>
              <Select.Option value="深圳市">深圳市</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="用车模式" name="useBikeMode">
            <Select style={{ width: 120 }} placeholder="请选择">
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="0">指定停车点模式</Select.Option>
              <Select.Option value="1">禁停区模式</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="营运模式" name="operateMode">
            <Select style={{ width: 120 }} placeholder="请选择">
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="0">自营</Select.Option>
              <Select.Option value="1">加盟</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="加盟商授权状态" name="authStatus">
            <Select style={{ width: 120 }} placeholder="请选择">
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="0">已授权</Select.Option>
              <Select.Option value="1">未授权</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button>重置</Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <p>
          <Button type="primary" onClick={handleClickOpenCity}>
            开通城市
          </Button>
        </p>
        <Table
          bordered
          dataSource={openList}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: listTotal,
            showTotal: (total) => `共 ${total} 条`,
            onChange: (current) => changePageHandle(current),
            onShowSizeChange: (current, size) => onShowSizeChangeHandle(current, size)
          }}
        />
      </Card>
      <Modal
        title="开通城市"
        visible={openCityVisiable}
        footer={null}
        onCancel={() => setOpenCityVisiable(false)}
        // onOk={handleOpenCitySubmit}
      >
        <Form
          initialValues={modalFormValues}
          layout="horizontal"
          {...formItemLayout}
          onFinish={handleOpenCitySubmit}
        >
          <Form.Item label="选择城市" name="cityName">
            <Select placeholder="请选择">
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="北京市">北京市</Select.Option>
              <Select.Option value="上海市">上海市</Select.Option>
              <Select.Option value="深圳市">深圳市</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="用车模式" name="useBikeMode">
            <Select placeholder="请选择">
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="0">指定停车点模式</Select.Option>
              <Select.Option value="1">禁停区模式</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="营运模式" name="operateMode">
            <Select placeholder="请选择">
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="0">自营</Select.Option>
              <Select.Option value="1">加盟</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item {...btnWrapperLayout}>
            <Space>
              <Button onClick={() => setOpenCityVisiable(false)}>取消</Button>
              <Button htmlType="submit" type="primary">
                提交
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
