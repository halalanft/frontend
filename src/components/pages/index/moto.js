import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import motto from '~/assets/images/motto.png'

export default function Moto() {
  return (
    <Box position="relative" zIndex={-20} bg="white">
      <Flex
        id="concept art"
        maxH="screen"
        w="full"
        alignItems="center"
        bg="rgba(250, 208, 44, 0.43)"
        px={8}
        py={16}
        direction={['column', 'column', 'row']}
      >
        <Box>
          <Text
            as="h1"
            fontFamily="impact"
            mb={8}
            fontSize="4xl"
            color="#171717"
            opacity={0.68}
            maxW={['full', 'full', '30rem']}
          >
            We bring very high-quality NFTs to your collection
          </Text>
          <Text
            mb={16}
            color="#171717"
            opacity={0.68}
            maxW={['full', 'full', '30rem']}
          >
            Our NFTs are painted with a high-quality design in mind to ensure
            that our holders are completely satisfied.
          </Text>
        </Box>
        <Box
          position="absolute"
          left={['auto', 'auto', '42rem']}
          zIndex={-10}
          display={{ base: 'none', md: 'none', lg: 'block' }}
        >
          <Image src={motto} alt="Motto" width={500} />
        </Box>
      </Flex>
    </Box>
  )
}
