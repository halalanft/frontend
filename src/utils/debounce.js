import { useCallback, useEffect, useRef, useState } from 'react'

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export const useDebouncedFunction = (func, delay) => {
  const callback = useRef(func)

  useEffect(() => {
    callback.current = func
  }, [func])

  return useCallback(
    (...args) =>
      new Promise((resolve) => {
        const handler = () => {
          clearTimeout(timer)
          resolve(callback.current(...args))
        }
        const timer = setTimeout(handler, delay || 300)
      }),
    [delay]
  )
}
