import React from 'react'
// import MenuList from '../../config/menuConf.js'
import { RouterMain } from '@/routers'
import logo from './imgs/logo.png'
import { Menu } from 'antd'
const { SubMenu } = Menu
import styles from './index.module.less'

export default function NavLeft(props) {
  // 菜单渲染-递归
  const renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.path}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.path}>{item.title}</Menu.Item>
    })
  }
  const menuTreeNode = renderMenu(RouterMain)
  const handleClick = (e) => {
    props.history.push({
      pathname: e.key
    })
  }
  const toDashboard = () => {
    props.history.push('/admin/dashboard')
  }

  return (
    <div className={styles['nav-left']}>
      <div className={styles['logo']} onClick={toDashboard}>
        <img src={logo} />
      </div>
      <Menu onClick={handleClick} theme="dark" className={styles['menu-wrapper']}>
        {menuTreeNode ? menuTreeNode : null}
      </Menu>
    </div>
  )
}
