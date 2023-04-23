import { Flex, Image, Text } from '@chakra-ui/react'
import logo from '~/assets/images/black.png'

const Footer = () => {
  return (
    <Flex
      as="footer"
      w="full"
      alignItems="center"
      justifyContent="space-between"
      bg="#FAD02C"
      px={8}
      py={14}
    >
      <Flex direction="column" gap={4} alignSelf="center" justifyContent="end">
        <Image src={logo.src} width={280} alt="Logo" />
      </Flex>
      <Flex direction="column" alignItems="center">
        <Text
          fontSize="md"
          fontWeight="semibold"
          color="#171717"
          opacity={0.68}
        >
          Copyright © 2022 - All right reserved
        </Text>
      </Flex>
    </Flex>
  )
}

export default Footer
