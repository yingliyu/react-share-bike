import React from 'react'
import MenuList from './../../config/menuConf.js'
import logo from './imgs/logo.png'
import { Menu } from 'antd'
const { SubMenu } = Menu
import './index.less'

export default class NavLeft extends React.Component {
  componentDidMount() {
    const menuTreeNode = this.renderMenu(MenuList)
    this.setState({
      menuTreeNode
    })
  }

  // 菜单渲染-递归
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.key}>{item.title}</Menu.Item>
    })
  }

  render() {
    return (
      <div className="nav-left">
        <div className="logo">
          <img src={logo} />
        </div>
        <Menu theme="dark" className="menu-wrapper">
          {this.state ? this.state.menuTreeNode : null}
        </Menu>
      </div>
    )
  }
}
