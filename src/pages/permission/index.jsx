import React, { useState, useEffect } from 'react'
import {
  Card,
  Button,
  Table,
  Space,
  message,
  Modal,
  Form,
  Input,
  Select,
  Tree,
  Transfer
} from 'antd'
import styles from './index.module.less'
import { permissionApi } from '@/services'
import { RouterMain } from '@/routers'
export default function Permission() {
  const treeData = [
    {
      title: '平台权限',
      key: '000',
      children: RouterMain
    }
  ]
  const columns = [
    {
      title: '角色ID',
      key: 'roleId',
      dataIndex: 'roleId'
    },
    {
      title: '角色名称',
      key: 'roleName',
      dataIndex: 'roleName'
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime'
    },
    {
      title: '授权时间',
      key: 'authTime',
      dataIndex: 'authTime'
    },
    {
      title: '授权人',
      key: 'authUser',
      dataIndex: 'authUser'
    },
    {
      title: '使用状态',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        switch (status) {
          case 0:
            return '禁用'
          case 1:
            return '启用'
        }
      }
    }
  ]
  // 已有权限
  const hadPermissions = [
    '/admin/dashboard',
    '/admin/ui',
    '/admin/ui/modals',
    '/admin/ui/loading',
    '/admin/ui/notification',
    '/admin/ui/message',
    '/admin/form',
    '/admin/form/login',
    '/admin/table',
    '/admin/table/base',
    '/admin/table/advance',
    '/admin/richtext/braft-editor',
    '/admin/user',
    '/admin/permission'
  ]
  const formItemlayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 12
    }
  }
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [roleId, setRoleId] = useState()
  const [createRoleVisible, setCreateRoleVisible] = useState(false)
  const [permissionSetVisible, setPermissionSetVisible] = useState(false)
  const [userAuthVisible, setUserAuthVisible] = useState(false)
  const [form] = Form.useForm()
  const [permissionForm] = Form.useForm()
  const [checkedKeys, setCheckedKeys] = useState(hadPermissions)
  const [transfer, setTransfer] = useState({
    targetKeys: [],
    selectedKeys: [],
    disabled: false
  })
  const initialValues = {
    roleName: '',
    status: ''
  }
  const permissionInitialValues = {
    roleName: 'lemon',
    status: '1'
  }
  useEffect(() => {
    initData()
  }, [currentPage, pageSize])

  useEffect(() => {
    getUserList()
  }, [])
  const [mockData, setMockData] = useState([])
  const getUserList = async () => {
    try {
      const res = await permissionApi.getUserList()
      console.log(res)
      setMockData(res.list)
      const oriTargetKeys = res.list
        .filter((item) => +Number(item.key) % 3 > 1)
        .map((item) => Number(item.key))
      setTransfer({
        targetKeys: oriTargetKeys,
        selectedKeys: transfer.selectedKeys,
        disabled: transfer.disabled
      })
    } catch (error) {
      message.error(error)
    }
  }
  const initData = async (params) => {
    try {
      const res = await permissionApi.getPermissionList(params)
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
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setSelected({
        selectedRowKeys: selectedRowKeys,
        selectedItems: selectedRows
      })
      setRoleId(selectedRows[0].roleId)
      console.log(roleId)
    }
  }
  // 表格的行事件
  const clickRowHandle = (record, index) => {
    setSelected({
      selectedRowKeys: [record.key],
      selectedItem: record
    })
    setRoleId(record.roleId)
  }
  const changePageHandle = (current) => {
    setCurrentPage(current)
  }
  const onShowSizeChangeHandle = (current, size) => {
    setPageSize(size)
  }
  const handleCreateRole = () => {
    setCreateRoleVisible(true)
  }
  const okHandle = async () => {
    try {
      const values = await form.validateFields()
      console.log(values)
      const res = await permissionApi.createRole({ ...values, id: roleId })
      console.log(res)
      setCreateRoleVisible(false)
      message.success('创建成功！')
    } catch (error) {}
  }
  const onCancel = () => {
    setCreateRoleVisible(false)
    form.setFieldsValue({
      roleName: '',
      status: ''
    })
  }
  const handleSetPermission = () => {
    if (!roleId) {
      message.error('请先选择一个角色！')
      return
    }
    setPermissionSetVisible(true)
  }
  const submitPermission = async () => {
    try {
      const values = await permissionForm.validateFields()
      console.log(values)
      const params = { ...values, id: roleId, permission: checkedKeys }
      console.log(params)
      const res = await permissionApi.setPermission(params)
      console.log(res)
      setPermissionSetVisible(false)
      message.success('设置成功！')
      permissionForm.setFieldsValue({
        roleName: '',
        status: ''
      })
    } catch (error) {}
  }
  const onCancelPermission = () => {
    setPermissionSetVisible(false)
    permissionForm.setFieldsValue({
      roleName: '',
      status: ''
    })
  }
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }

  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info)
    setCheckedKeys(checkedKeys)
  }
  const showUserAuth = () => {
    if (!roleId) {
      message.error('请先选择一个角色！')
      return
    }
    setUserAuthVisible(true)
  }
  const okAuthHandle = () => {
    // setUserAuthVisible(true)
    const params = {
      targetKeys: transfer.targetKeys,
      id: roleId,
      roleName: permissionInitialValues.roleName
    }
    console.log('提交授权：', params)
    message.success('授权成功！')
    setUserAuthVisible(false)
  }
  const onAuthCancel = () => {
    setUserAuthVisible(false)
  }

  const handleChange = (targetKeys, direction, moveKeys) => {
    setTransfer({
      targetKeys: targetKeys,
      selectedKeys: [],
      disabled: transfer.disabled
    })
    console.log('targetKeys: ', targetKeys)
    console.log('direction: ', direction)
    console.log('moveKeys: ', moveKeys)
  }

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setTransfer({
      targetKeys: transfer.targetKeys,
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
      disabled: transfer.disabled
    })

    console.log('sourceSelectedKeys: ', sourceSelectedKeys)
    console.log('targetSelectedKeys: ', targetSelectedKeys)
  }

  const handleScroll = (direction, e) => {
    // console.log('direction:', direction)
    // console.log('target:', e.target)
  }
  return (
    <div className={styles['permission-wrapper']}>
      <Card title="权限设置">
        <div>
          <Space>
            <Button type="primary" onClick={handleCreateRole}>
              创建角色
            </Button>
            <Button type="primary" onClick={handleSetPermission}>
              设置权限
            </Button>
            <Button type="primary" onClick={showUserAuth}>
              用户授权
            </Button>
          </Space>
        </div>
        <br />
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
      <Modal title="创建角色" visible={createRoleVisible} onOk={okHandle} onCancel={onCancel}>
        <Form initialValues={initialValues} form={form} {...formItemlayout}>
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[
              {
                required: true,
                message: '请输入角色名称'
              }
            ]}
          >
            <Input placeholder="请输入角色名称" allowClear />
          </Form.Item>

          <Form.Item
            label="状态"
            name="status"
            rules={[
              {
                required: true,
                message: '请选择状态'
              }
            ]}
          >
            <Select placeholder="请选择状态" allowClear>
              <Select.Option value="1" key="1">
                启用
              </Select.Option>
              <Select.Option value="0" key="0">
                禁用
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      {/* 权限设置 */}
      <Modal
        title="权限设置"
        visible={permissionSetVisible}
        onOk={submitPermission}
        onCancel={onCancelPermission}
      >
        <Form initialValues={permissionInitialValues} form={permissionForm} {...formItemlayout}>
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[
              {
                required: true,
                message: '请输入角色名称'
              }
            ]}
          >
            <Input placeholder="请输入角色名称" readOnly allowClear />
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            rules={[
              {
                required: true,
                message: '请选择状态'
              }
            ]}
          >
            <Select placeholder="请选择状态" allowClear>
              <Select.Option value="1" key="1">
                启用
              </Select.Option>
              <Select.Option value="0" key="0">
                禁用
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="平台权限" name="permission">
            <Tree
              checkable
              treeData={treeData}
              onSelect={onSelect}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* 用户授权 */}
      <Modal title="用户授权" visible={userAuthVisible} onOk={okAuthHandle} onCancel={onAuthCancel}>
        <Form initialValues={permissionInitialValues}>
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[
              {
                required: true,
                message: '请输入角色名称'
              }
            ]}
          >
            <Input placeholder="请输入角色名称" readOnly />
          </Form.Item>
          <Form.Item label="选择用户" name="selectedUsers">
            <Transfer
              listStyle={{ width: 200, height: 400 }}
              dataSource={mockData}
              titles={['待选用户', '已选用户']}
              filterOption={(inputValue, item) =>
                item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
              }
              targetKeys={transfer.targetKeys}
              selectedKeys={transfer.selectedKeys}
              onChange={handleChange}
              onSelectChange={handleSelectChange}
              onScroll={handleScroll}
              render={(item) => item.title}
              disabled={transfer.disabled}
              showSearch={true}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
