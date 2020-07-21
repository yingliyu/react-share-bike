import React, { useState, useEffect } from 'react'
import { Card, Form, Select, Button, Table, Modal, Space } from 'antd'
import styles from './index.module.less'
import { cityApi } from '@/services'
import { useFetch, usePagination } from '@/hooks'
import {
  FORMITEMLAYOUT as formItemLayout,
  BTNWRAPPERLAYOUT as btnWrapperLayout,
  DEFAULTPAGINATION as defaultPagination
} from '@/utils/constants'
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

  const { data = {}, doFetch } = useFetch({
    fetch: cityApi.getOpenCityList,
    params: {
      current: 1,
      pageSize: 10
    }
  })

  const [pagination, setPagination] = usePagination({
    total: data.total,
    onChange: (current, pageSize) => {
      doFetch({ current, pageSize })
    }
  })

  useEffect(() => {
    setPagination({
      total: data.total
    })
  }, [data])

  const [openCityVisiable, setOpenCityVisiable] = useState(false)

  const handleClickOpenCity = () => {
    setOpenCityVisiable(true)
  }
  // 城市开通api
  const handleOpenCitySubmit = async (fileList) => {
    try {
      await cityApi.openCity(fileList)
      setOpenCityVisiable(false)
      doFetch()
      Modal.success({ content: '开通成功！' })
    } catch (error) {
      console.log(error)
    }
  }
  // 查询
  const handleSearchSubmit = (fileList) => {
    const params = {
      ...fileList,
      ...defaultPagination
    }
    doFetch(params)
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
        {/* table */}
        <Table bordered dataSource={data.list} columns={columns} pagination={pagination} />
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
