import React from 'react'
import './index.less'
import { Button } from 'antd'
export default (props) => {
  const handleClick = () => {
    props.history.push('/admin/dashboard')
  }
  return (
    <div className="login-wrapper">
      <h3>Welcome to login page!</h3>
      <hr />
      <Button onClick={handleClick}>LOGIN</Button>
    </div>
  )
}
