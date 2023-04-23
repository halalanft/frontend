import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import logo from '~/assets/images/fix.png'

const About = () => {
  return (
    <Flex
      id="about"
      direction={['column', 'column', 'row']}
      bgColor="white"
      px={8}
      py={16}
      w="full"
      justify="space-between"
    >
      <Box w={['full', 'full', '40rem']}>
        <Heading
          as="h1"
          fontFamily="Impact"
          mb={8}
          fontSize="4xl"
          color="#171717"
          opacity={0.68}
        >
          {'About '}
          <Text as="span" color="#FAD02C">
            Halalanft
          </Text>
        </Heading>
        <Text color="#171717" opacity={0.68}>
          Halalanft is a <strong>community NFT collection</strong> of halal Web3
          enthusiasts, which will bring halal perspective as the main foundation
          for NFT and DeFi protocols to be built in the ecosystem. Halalanft is
          not just a collection of NFTs that we may see in the market at the
          moment, most of them have no utility and only take advantage of the
          temporary hype. Halalanft is a long-term NFT project that will give
          benefits to the holder beyond enjoying the art of NFT they have
          purchased.
        </Text>
      </Box>
      <Box mt={[8, 8, 0]} alignSelf={['auto', 'auto', 'end']}>
        <Image src={logo.src} width={400} alt="Logo" />
      </Box>
    </Flex>
  )
}

export default About
