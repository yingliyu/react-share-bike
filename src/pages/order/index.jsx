import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import { Card, Form, Select, Button, Table, Modal, DatePicker, Space, message } from 'antd'
import { orderApi } from '@/services'
// import moment from 'moment'
export default function OrderManage(props) {
  const columns = [
    {
      title: '订单编号',
      key: 'orderId',
      dataIndex: 'orderId'
    },
    {
      title: '车辆编号',
      key: 'bikeNo',
      dataIndex: 'bikeNo'
    },
    {
      title: '用户名',
      key: 'userName',
      dataIndex: 'userName'
    },
    {
      title: '手机号',
      key: 'phone',
      dataIndex: 'phone'
    },
    {
      title: '里程/km',
      key: 'mileage',
      dataIndex: 'mileage'
    },
    {
      title: '行程时长',
      key: 'timeLength',
      dataIndex: 'timeLength'
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
      title: '开始时间',
      key: 'startTime',
      dataIndex: 'startTime'
    },
    {
      title: '结束时间',
      key: 'endTime',
      dataIndex: 'endTime'
    },
    {
      title: '订单金额/元',
      key: 'orderMoeny',
      dataIndex: 'orderMoeny'
    },
    {
      title: '实付金额/元',
      key: 'realMoney',
      dataIndex: 'realMoney'
    }
  ]
  const searchFormDefaultValues = {
    cityName: '',
    startTime: '',
    endTime: '',
    orderStatus: ''
  }
  const dateFormat = 'YYYY-MM-DD HH:mm:ss'
  const handleSearchSubmit = (values) => {
    console.log(values)
    const params = {
      cityName: values.cityName,
      orderStatus: values.orderStatus,
      startTime: values.time[0].format(dateFormat),
      endTime: values.time[1].format(dateFormat)
    }
    console.log(params)
    initData(params)
  }
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [orderId, setOrderId] = useState()
  // const [openCityVisiable, setOpenCityVisiable] = useState(false)
  useEffect(() => {
    initData()
  }, [currentPage, pageSize])

  const initData = async (params) => {
    try {
      const res = await orderApi.getOrderList(params)
      console.log(res)
      setList(res.list)
      setTotal(res.total)
    } catch (error) {
      message.error(error)
    }
  }
  const [selectedParams, setSelected] = useState({
    selectedRowKeys: [],
    selectedItem: null
  })
  const rowRadioSelection = {
    type: 'radio',
    selectedRowKeys: selectedParams.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setSelected({
        selectedRowKeys: selectedRowKeys,
        selectedItems: selectedRows
      })
      setOrderId(selectedRows[0].orderId)
    }
  }
  // 表格的行事件
  const clickRowHandle = (record, index) => {
    setSelected({
      selectedRowKeys: [record.key],
      selectedItem: record
    })
    setOrderId(record.orderId)
    // Modal.info({
    //   title: '点击的行信息',
    //   content: `用户名：${record.userName}; key: ${record.key}; `
    // })
  }
  const changePageHandle = (current) => {
    setCurrentPage(current)
  }
  const onShowSizeChangeHandle = (current, size) => {
    setPageSize(size)
  }
  const endOrder = () => {
    if (orderId) {
      Modal.confirm({
        title: '结束订单',
        content: `确定结束订单号：${orderId}的订单吗？`,
        onOk: async () => {
          console.log('ok,orderId=', orderId)
          try {
            await orderApi.endOrder({ id: orderId })
            message.success('操作成功，订单已结束！')
            initData()
            setSelected({ selectedRowKeys: [], selectedItem: null })
          } catch (error) {}
        },
        onCancel: () => {
          console.log('cancle')
        }
      })
    } else {
      message.warning('你还没有选择订单哦！')
    }
  }
  const orderDetailHandle = () => {
    if (orderId) {
      props.history.push(`/order/detail/${orderId}`)
    } else {
      message.warning('你还没有选择订单哦！')
    }
  }
  return (
    <div className={styles['order-manage-wrapper']}>
      <Card>
        <Form layout="inline" onFinish={handleSearchSubmit} initialValues={searchFormDefaultValues}>
          <Form.Item label="城市" name="cityName">
            <Select style={{ width: 120 }} placeholder="请选择">
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="北京市">北京市</Select.Option>
              <Select.Option value="上海市">上海市</Select.Option>
              <Select.Option value="深圳市">深圳市</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="time">
            <DatePicker.RangePicker inputReadOnly showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item label="订单状态" name="orderStatus">
            <Select style={{ width: 150 }} placeholder="请选择">
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="0">进行中</Select.Option>
              <Select.Option value="1">进行中（临时停车）</Select.Option>
              <Select.Option value="2">行程结束</Select.Option>
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
        <div className={styles['btn-order-wrapper']}>
          <Space>
            <Button type="primary" onClick={orderDetailHandle}>
              订单详情
            </Button>
            <Button type="danger" onClick={endOrder}>
              结束订单
            </Button>
          </Space>
        </div>

        <Table
          rowSelection={rowRadioSelection}
          onRow={(record, index) => {
            return {
              onClick: () => clickRowHandle(record, index)
            }
          }}
          bordered
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
      <Modal>
        <p>content...</p>
      </Modal>
    </div>
  )
}
