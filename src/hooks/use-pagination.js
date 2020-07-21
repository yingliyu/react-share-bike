import { useState, useMemo } from 'react'
import { DEFAULTPAGINATION as defaultPagination } from '@/utils/constants'

export function usePagination(config = defaultPagination) {
  const [paginationConf, setPagination] = useState({
    pageSize: config.pageSize || defaultPagination.pageSize,
    current: config.page || config.currentPage || defaultPagination.current
  })

  const pagination = useMemo(() => {
    return {
      ...config,
      total: paginationConf.total,
      showTotal: (total) => `共 ${total} 条`,
      onChange: (current, pageSize) => {
        if (config.onChange) {
          config.onChange(current, pageSize)
        }
        setPagination({ current, pageSize })
      },
      onShowSizeChange: (current, pageSize) => {
        if (config.onChange) {
          config.onChange(current, pageSize)
        }
        setPagination({ current, pageSize })
      }
    }
  }, [config, paginationConf])

  return [pagination, setPagination]
}
