import { useState, useEffect, useCallback } from 'react'

export function useFetch(options) {
  console.log(options)
  const [data, setData] = useState()
  const [newParams, setNewParams] = useState(options.params)
  const fetchApi = useCallback(async () => {
    const res = await options.fetch(newParams)
    setData(res)
  }, [options.fetch, newParams])

  useEffect(() => {
    fetchApi()
  }, [fetchApi])

  const doFetch = useCallback((rest) => {
    console.log(rest)
    setNewParams(rest)
  }, [])

  // 刷新结果
  const reFetch = () => {
    setNewParams({ ...newParams })
  }
  return { data, doFetch, reFetch }
}
