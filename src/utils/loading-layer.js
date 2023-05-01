import { Center, Image, Text, Spinner } from '@chakra-ui/react'

export const LoadingLayer = () => {
  return (
    <Center minHeight="80vh" display="flex" flexDirection="column">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#374C8C"
        size="xl"
      />
    </Center>
  )
}
