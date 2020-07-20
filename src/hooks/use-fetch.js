import { useState, useEffect, useCallback } from 'react'

export function useFetch(fetch, params) {
  const [data, setData] = useState()
  const [newParams, setNewParams] = useState(params)
  const fetchApi = useCallback(async () => {
    const res = await fetch(newParams)
    // console.log(res)
    setData(res)
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
