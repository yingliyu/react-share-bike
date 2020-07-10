import React from 'react'
import loadable from '@loadable/component'
import styles from './index.module.less'

const Header = loadable((props) => import(`@/components/header`), {
  fallback: <div>加载中...</div>
})
export default function Base(props) {
  return (
    <div className={styles['base-wrapper']}>
      {/* 头部 */}
      <Header menuType="second" />
      <div className={styles['base-content-wrapper']}>{props.children}</div>
    </div>
  )
}
