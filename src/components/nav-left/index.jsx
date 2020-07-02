import React from 'react'
import MenuList from '../../config/menuConf.js'
import logo from './imgs/logo.png'
import { Menu } from 'antd'
const { SubMenu } = Menu
import './index.less'

export default function NavLeft() {
  // 菜单渲染-递归
  const renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.key}>{item.title}</Menu.Item>
    })
  }
  const menuTreeNode = renderMenu(MenuList)

  return (
    <div className="nav-left">
      <div className="logo">
        <img src={logo} />
      </div>
      <Menu theme="dark" className="menu-wrapper">
        {menuTreeNode ? menuTreeNode : null}
      </Menu>
    </div>
  )
}
