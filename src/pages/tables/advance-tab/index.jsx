import React, { useState, useEffect } from 'react'
import { Card, Table, Badge, Modal, message, Button } from 'antd'
import { tableApi } from '@/services'
import styles from './index.module.less'
export default () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render(sex) {
        return sex === 1 ? '男' : '女'
      },
      width: 80
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 150
    },
    {
      title: '爱好',
      dataIndex: 'insterest',
      key: 'insterest'
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      width: 180
    },
    {
      title: '早起时间',
      dataIndex: 'time',
      key: 'time',
      width: 100
    }
  ]

  const columnsFixed = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      fixed: 'left'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      fixed: 'left'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render(sex) {
        return sex === 1 ? '男' : '女'
      },
      width: 150
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 150
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 250
    },
    {
      title: '爱好',
      dataIndex: 'insterest',
      key: 'insterest'
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      width: 400
    },
    {
      title: '早起时间',
      dataIndex: 'time',
      key: 'time',
      width: 100,
      fixed: 'right'
    }
  ]
  const columnsSort = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render(sex) {
        return sex === 1 ? '男' : '女'
      },
      width: 80
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      sorter: (a, b) => a.age - b.age
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 150
    },
    {
      title: '爱好',
      dataIndex: 'insterest',
      key: 'insterest'
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      width: 180
    },
    {
      title: '早起时间',
      dataIndex: 'time',
      key: 'time',
      width: 100
    }
  ]
  const columnsOperate = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render(sex) {
        let config = {
          '1': <Badge status="processing" text="男" />,
          '0': <Badge status="error" text="女" />
        }
        return config[sex]
      },
      width: 80
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      sorter: (a, b) => a.age - b.age
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 150
    },
    {
      title: '爱好',
      dataIndex: 'insterest',
      key: 'insterest'
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      width: 180
    },
    {
      title: '操作',
      render(text, item) {
        return (
          <Button type="danger" size="small" onClick={(item) => handleDelete(item)}>
            删除
          </Button>
        )
      },
      width: 100
    }
  ]
  const [tabData, setTabData] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    total: 0
  })
  const [sort, setSort] = useState({
    sortType: '',
    order: ''
  })
  useEffect(() => {
    getTableData()
  }, [pagination.currentPage, pagination.pageSize])

  const getTableData = async () => {
    try {
      const params = { ...pagination }
      const res = await tableApi.getTableData(params)
      setTabData(res.list)
      setPagination({
        currentPage: pagination.currentPage,
        pageSize: pagination.pageSize,
        total: res.total
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (pagination, sorter, extra) => {
    console.log('params', sorter, extra)
    console.log(sort)

    setSort({
      sortType: extra.columnKey,
      order: extra.order
    })
    // console.log(sort)
  }
  // 删除操作
  const handleDelete = (item) => {
    // let id = item.id
    Modal.confirm({
      title: '确认',
      content: '您确认删除此条数据吗?',
      onOk: () => {
        message.success('删除成功！')
        getTableData()
      }
    })
  }
  return (
    <div className={styles['advance-table-wrapper']}>
      <Card title="头部固定">
        <Table
          bordered
          dataSource={tabData}
          columns={columns}
          pagination={false}
          scroll={{ y: 240 }}
        />
      </Card>
      <Card title="左侧固定">
        <Table
          bordered
          dataSource={tabData}
          columns={columnsFixed}
          pagination={false}
          scroll={{ x: 1500, y: 300 }}
        />
      </Card>
      <Card title="排序">
        <Table
          bordered
          dataSource={tabData}
          columns={columnsSort}
          pagination={false}
          onChange={handleChange}
        />
      </Card>
      <Card title="操作按钮">
        <Table bordered dataSource={tabData} columns={columnsOperate} pagination={false} />
      </Card>
    </div>
  )
}
