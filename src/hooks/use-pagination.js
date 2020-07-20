import { useState, useMemo } from 'react'
const defaultPagination = {
  current: 1,
  pageSize: 10
}

export function usePagination(config = defaultPagination) {
  const [pagination, setPagination] = useState({
    pageSize: config.pageSize || defaultPagination.pageSize,
    current: config.page || config.currentPage || defaultPagination.current
  })

  const paginationConf = useMemo(() => {
    return {
      ...defaultPagination,
      total: pagination.total,
      showTotal: (total) => `共 ${total} 条`,
      onChange: (current, pageSize) => {
        if (config.onChange) {
          config.onChange(current, pageSize)
        }
        // console.log(current, pageSize)

        // setPagination(Object.assign(pagination, { current, pageSize }))

        // console.log(pagination)
      },
      onShowSizeChange: (current, pageSize) => {
        if (config.onChange) {
          config.onChange(current, pageSize)
        }
        setPagination(Object.assign(pagination, { current, pageSize }))
      }
    }
  }, [config, pagination])

  return [paginationConf, setPagination]
}
