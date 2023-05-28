import { useState } from 'react'
import { useContractRead } from 'wagmi'

export const range = (start, stop, step = 1) => {
  if (start > stop) {
    return Array(Math.ceil(Math.abs(stop - start) / step))
      .fill(start)
      .map((x, y) => x - y * step)
      .filter((x) => x > 0)
  }

  return Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step)
}

export const useTokenBatch = (abi, address, functionName, initialArgs) => {
  const [dynamicArgs, setDynamicArgs] = useState(initialArgs)
  const { data, refetch } = useContractRead({
    abi,
    address,
    enabled: true,
    functionName,
    watch: true,
    args: dynamicArgs,
  })

  return {
    data,
    refetchWithNewArgs: (newArgs) => {
      setDynamicArgs(newArgs)
      refetch()
    },
  }
}
