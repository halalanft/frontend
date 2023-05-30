import { Box, Text, Center } from '@chakra-ui/react'
import Image from 'next/image'
import finance from '~/assets/images/finance.svg'
import { LandingLayout } from '~/components/layout'

export default function Finance() {
  return (
    <Box w="full" h="100vh" px={16} py={28}>
      <Box display="flex" justifyContent="center" mx="auto" mb={16}>
        <Image src={finance} alt="Finance" width={400} />
      </Box>
      <Center>
        {' '}
        <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold">
          Coming Soon ...
        </Text>
      </Center>
    </Box>
  )
}
