import React from 'react'

import styles from './index.module.less'

export default function Base(props) {
  return <div className={styles['base-wrapper']}>{props.children}</div>
}
