import { Flex, Image, Text } from '@chakra-ui/react'
import logo from '~/assets/images/black.png'

export default function LandingFooter() {
  return (
    <Flex
      direction={['column', 'row']}
      as="footer"
      w="full"
      alignItems="center"
      justifyContent="space-between"
      bg="#FAD02C"
      px={8}
      py={14}
      gap={6}
    >
      <Image src={logo.src} width={280} alt="Logo" />
      <Text fontSize="md" fontWeight="semibold" color="#171717" opacity={0.68}>
        Copyright © 2022 - All right reserved
      </Text>
    </Flex>
  )
}
