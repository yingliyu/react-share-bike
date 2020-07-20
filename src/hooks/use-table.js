import { useState, useEffect, useCallback } from 'react'
export function useTable(fetch, params) {
  const [data, setData] = useState()
  const [newParams, setNewParams] = useState(params)
  const fetchApi = useCallback(async () => {
    const res = await fetch(newParams)
    if (res.code === 1) {
      setData(res.data)
    }
  }, [fetch, newParams])

  useEffect(() => {
    console.log('useEffect')
    fetchApi()
  }, [fetchApi])

  const doFetch = useCallback((rest) => {
    setNewParams(rest)
  }, [])

  const reFetch = () => {
    setNewParams({ ...newParams })
  }
  return {
    data,
    doFetch,
    reFetch
  }
}
