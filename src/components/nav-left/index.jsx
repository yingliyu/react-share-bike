import React, { useState } from 'react'
import { RouterMain } from '@/routers'
import logo from './imgs/logo.png'
import { Menu } from 'antd'
import styles from './index.module.less'
import { connect } from 'react-redux'
import { appActionCreators } from '@/store/action-creators'
import Cookie from 'js-cookie'
const { SubMenu } = Menu

function NavLeft(props) {
  const [selectMenu, setSelectMenu] = useState([props.location.pathname])
  const { switchMenu } = props
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
      return (
        <Menu.Item title={item.title} key={item.path}>
          {item.title}
        </Menu.Item>
      )
    })
  }
  const menuTreeNode = renderMenu(RouterMain)
  const handleClick = (item) => {
    props.history.push({
      pathname: item.key
    })
    setSelectMenu(item.keyPath)
    switchMenu(item.item.props.title)
    Cookie.set('CURRENT_MENU', item.item.props.title)
  }
  const toDashboard = () => {
    const path = '/admin/dashboard'
    props.history.push(path)
    setSelectMenu(path)
    switchMenu('首页')
    Cookie.set('CURRENT_MENU', '首页')
  }

  return (
    <div className={styles['nav-left']}>
      <div className={styles['logo']} onClick={toDashboard}>
        <img src={logo} />
      </div>
      <Menu
        onClick={handleClick}
        theme="dark"
        className={styles['menu-wrapper']}
        selectedKeys={selectMenu}
      >
        {menuTreeNode ? menuTreeNode : null}
      </Menu>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchMenu: (val) => dispatch(appActionCreators.switchMenu(val))
  }
}
export default connect(null, mapDispatchToProps)(NavLeft)
