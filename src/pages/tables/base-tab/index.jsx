import React, { useState, useEffect } from 'react'
import { Card, Table, Modal, Button, message, Pagination } from 'antd'
import { tableApi } from '@/services'
import styles from './index.module.less'
export default () => {
  const dataSource = [
    {
      id: '1',
      key: '1',
      name: '唐嫣',
      sex: '女',
      age: 18,
      birthday: '2002-01-24',
      address: '上海市徐汇区花园鹿',
      insterest: '唱歌、跳舞、表演',
      time: '09:00:00'
    },
    {
      id: '2',
      key: '2',
      name: '胡彦斌',
      sex: '男',
      birthday: '1982-01-24',
      age: 32,
      address: '西湖区湖底公园1号',
      insterest: '唱歌、跳舞、表演',
      time: '09:00:00'
    },
    {
      id: '3',
      key: '3',
      name: '郑爽',
      sex: '女',
      birthday: '2008-11-12',
      age: 12,
      address: '东北铁岭',
      insterest: '唱歌、跳舞、表演',
      time: '09:00:00'
    },
    {
      id: '4',
      key: '4',
      name: '无彦祖',
      sex: '男',
      birthday: '1978-06-14',
      age: 42,
      address: '西湖区湖底公园121号',
      insterest: '唱歌、跳舞、表演',
      time: '09:00:00'
    }
  ]

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render(sex) {
        return sex === 1 ? '男' : '女'
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday'
    },
    {
      title: '爱好',
      dataIndex: 'insterest',
      key: 'insterest'
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '早起时间',
      dataIndex: 'time',
      key: 'time'
    }
  ]
  const [tabData, setTabData] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    total: 0
  })
  const [selectedParams, setSelected] = useState({
    selectedRowKeys: [],
    selectedItem: null
  })
  const [selectedCheckParams, setSelectedCheck] = useState({
    selectedRowKeys: [],
    selectedItems: null
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

  const rowSelection = {
    type: 'radio',
    selectedRowKeys: selectedParams.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      clickRowHandle(selectedRows[0])
    }
  }

  const rowCheckSelection = {
    type: 'checkbox',
    selectedRowKeys: selectedCheckParams.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setSelectedCheck({
        selectedRowKeys: selectedRowKeys,
        selectedItems: selectedRows
      })
    }
  }
  // 表格的行事件
  const clickRowHandle = (record, index) => {
    setSelected({
      selectedRowKeys: [record.key],
      selectedItem: record
    })
    Modal.info({
      title: '点击的行信息',
      content: `用户名：${record.name}; key: ${record.key}; `
    })
  }
  // 多选执行删除动作
  const deleteRows = () => {
    let rows = selectedCheckParams.selectedItems
    let ids = []
    rows.map((item) => {
      ids.push(item.id)
      return ids
    })
    Modal.confirm({
      title: '删除提示',
      content: `您确定要删除这些数据吗？${ids.join(',')}`,
      onOk: () => {
        message.success('删除成功！')
        getTableData() // 更新页面
        setSelectedCheck({
          selectedRowKeys: [],
          selectedItems: null
        })
      }
    })
  }
  const changPage = (current) => {
    setPagination({
      currentPage: current,
      pageSize: pagination.pageSize,
      total: pagination.total
    })
  }
  const changePageSize = (current, pageSize) => {
    setPagination({
      currentPage: 1,
      pageSize: pageSize,
      total: pagination.total
    })
  }
  return (
    <div className={styles['base-table-wrapper']}>
      <Card title="基础表格">
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </Card>
      <Card title="动态数据渲染表格-单选框">
        <Table
          rowSelection={rowSelection}
          dataSource={tabData}
          columns={columns}
          pagination={false}
          onRow={(record, index) => {
            return {
              onClick: () => clickRowHandle(record, index) // 点击行
            }
          }}
        />
      </Card>
      <Card title="动态数据渲染表格-复选框">
        <p>
          <Button type="primary" onClick={deleteRows}>
            删除
          </Button>
        </p>
        <Table
          bordered
          rowSelection={rowCheckSelection}
          dataSource={tabData}
          columns={columns}
          pagination={false}
        />
      </Card>
      <Card title="动态表格-分页">
        <Table bordered dataSource={tabData} columns={columns} pagination={false} />
        <div className={styles['pagination-wrapper']}>
          <Pagination
            total={pagination.total}
            current={pagination.currentPage}
            showSizeChanger
            // pageSizeOptions={['10', '20', '50', '100']}
            showQuickJumper={{ goButton: '页' }}
            onChange={(current) => changPage(current)}
            onShowSizeChange={(current, pageSize) => changePageSize(current, pageSize)}
            showTotal={(total) => `共 ${total} 条`}
          />
        </div>
      </Card>
    </div>
  )
}
