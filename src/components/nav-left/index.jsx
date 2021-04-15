import React from 'react'
// import MenuList from '../../config/menuConf.js'
import { RouterMain } from '@/routers'
import logo from './imgs/logo.png'
import { Menu } from 'antd'
const { SubMenu } = Menu
import './index.less'

export default function NavLeft(props) {
  // 菜单渲染-递归
  const renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.name} key={item.path}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.path}>{item.name}</Menu.Item>
    })
  }
  const menuTreeNode = renderMenu(RouterMain)
  const handleClick = (e) => {
    props.history.push({
      pathname: e.key
    })
  }
  return (
    <div className="nav-left">
      <div className="logo">
        <img src={logo} />
      </div>
      <Menu onClick={handleClick} theme="dark" className="menu-wrapper">
        {menuTreeNode ? menuTreeNode : null}
      </Menu>
    </div>
  )
}
