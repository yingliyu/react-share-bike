import { useEffect } from 'react'
import { useFetch, usePagination } from '@/hooks'
import { DEFAULTPAGINATION as defaultPagination } from '@/utils/constants'

export function useTable(options) {
  const { data = {}, doFetch, reFetch } = useFetch({
    fetch: options.fetch,
    params: {
      ...options.params,
      ...defaultPagination
    }
  })
  const tableProps = {
    dataSource: data.list
  }

  const [pagination, setPagination] = usePagination({
    total: data.total,
    onChange: (current, pageSize) => {
      if (!options.onChange) {
        if (options.pagination && options.pagination.onChange) {
          options.pagination.onChange(current, pageSize)
        }
      } else {
        doFetch({ current, pageSize })
      }
    }
  })

  useEffect(() => {
    setPagination({
      total: data.total
    })
  }, [data])

  if (options.pagination) {
    tableProps.pagination = pagination
  } else {
    tableProps.pagination = false
  }

  // const doFetch = useCallback(
  //   (params) => {
  //     console.log(params)
  //     doFetch(params)
  //     if (params.current) {
  //       setPagination({
  //         pageSize: pagination.pageSize,
  //         current: params.current
  //       })
  //     }
  //   },
  //   [pagination, setPagination, dofetch]
  // )
  return { tableProps, doFetch, reFetch }
}
