import React, { useState, useEffect } from 'react'
import { Card, Table, message, Space, Button } from 'antd'
import QueryForm from '@/components/query-form'
import { employeeApi } from '@/services'
import styles from './index.module.less'
// import QueryTab from '@/components/query-table'
export default function CityManage() {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
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
  const editHandle = (rows) => {
    console.log('编辑===', rows)
  }
  const deleteHandle = (rows) => {
    console.log('删除===', rows)
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
  const addEmployeeHandle = () => {
    console.log('创建员工')
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
              创建员工
            </Button>
          </Space>
        </div>
        <br />
        <Table
          bordered
          rowSelection={{
            type: 'radio'
          }}
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
    </div>
  )
}
