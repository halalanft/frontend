import { CircularProgress, Progress, VStack } from '@chakra-ui/react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

// 1. Creating a context
const LoadingProgressContext = createContext({
  value: 0,
  start: () => {},
  done: () => {},
})

// 2. useLoadingProgress hook
export const useLoadingProgress = () => {
  return useContext(LoadingProgressContext)
}

// 3. LoadingProgress component
const LoadingProgress = () => {
  const { value } = useLoadingProgress()

  return (
    <VStack align="flex-end" position="absolute" top={0} left={0} right={0}>
      <Progress value={value} size="xs" width="100%" />
      <CircularProgress size="24px" isIndeterminate pr={2} />
    </VStack>
  )
}

// 4. LoadingProgressProvider
export const LoadingProgressProvider = ({ children }) => {
  // 5. Variables
  const step = useRef(5)
  const [value, setValue] = useState(0)
  const [isOn, setOn] = useState(false)

  // 6. useEffect
  useEffect(() => {
    if (isOn) {
      let timeout = 0

      if (value < 20) {
        step.current = 5
      } else if (value < 40) {
        step.current = 4
      } else if (value < 60) {
        step.current = 3
      } else if (value < 80) {
        step.current = 2
      } else {
        step.current = 1
      }

      if (value <= 98) {
        //@ts-ignore
        timeout = setTimeout(() => {
          setValue(value + step.current)
        }, 500)
      }

      return () => {
        if (timeout) {
          clearTimeout(timeout)
        }
      }
    }
  }, [value, isOn])

  // 7. start
  const start = () => {
    setValue(0)
    setOn(true)
  }

  // 8. done
  const done = () => {
    setValue(100)
    setTimeout(() => {
      setOn(false)
    }, 200)
  }

  return (
    <LoadingProgressContext.Provider
      value={{
        value,
        start,
        done,
      }}
    >
      {isOn ? <LoadingProgress /> : <></>}
      {children}
    </LoadingProgressContext.Provider>
  )
}
