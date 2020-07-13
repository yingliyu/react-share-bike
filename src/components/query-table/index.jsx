import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import styles from './index.module.less'

export default function QueryTable(props) {
  const { initData } = props
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  useEffect(() => {
    getData()
  }, [currentPage, pageSize, initData])
  const getData = async () => {
    const res = await initData()
    setList(res.list)
    setTotal(res.total)
  }
  const changePageHandle = (current) => {
    setCurrentPage(current)
  }
  const onShowSizeChangeHandle = (current, size) => {
    setPageSize(size)
  }

  return (
    <div className={styles['query-table-wrapper']}>
      <Table
        bordered
        dataSource={list}
        columns={props.columns}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (current) => changePageHandle(current),
          onShowSizeChange: (current, size) => onShowSizeChangeHandle(current, size)
        }}
      />
    </div>
  )
}
