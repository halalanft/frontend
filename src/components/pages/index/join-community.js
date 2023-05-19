import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react'
import {
  faDiscord,
  faMedium,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function JoinCommunity() {
  return (
    <Box id="community" px={8} py={16} bg="#F2F2F2" w="full">
      <Text
        as="h1"
        fontSize="4xl"
        fontFamily="impact"
        mb={8}
        textAlign="center"
        color="#171717"
        opacity={0.68}
      >
        Join with Community
      </Text>
      <Text
        mb={16}
        textAlign="center"
        color="#171717"
        opacity={0.68}
        maxW="lg"
        mx="auto"
      >
        Building NFTs should always be about community. Thus, we are aiming to
        help the Web3 community with halal ecosystem in the DeFi world. If you
        want to discuss and chat with us, please follow and join our media
        below.
      </Text>
      <Flex
        justifyContent="center"
        direction={['column', 'column', 'row']}
        gap={5}
        textAlign="center"
      >
        <Link href="https://discord.com/invite/be5fnEqrZQ" isExternal>
          <Button
            w={['full', 'full', 'auto']}
            p={6}
            gap={2}
            bg="#374C8C"
            _hover={{ bg: '#283765' }}
            color="white"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={4}
          >
            <FontAwesomeIcon icon={faDiscord} width="32" />
            <strong>DISCORD</strong>
          </Button>
        </Link>

        <Link href="https://twitter.com/halalanft" isExternal>
          <Button
            w={['full', 'full', 'auto']}
            p={6}
            gap={2}
            bg="#374C8C"
            _hover={{ bg: '#283765' }}
            color="white"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={4}
          >
            <FontAwesomeIcon icon={faTwitter} width="24" />
            <strong>TWITTER</strong>
          </Button>
        </Link>
        <Link href="https://medium.com/@halalanft" isExternal>
          <Button
            w={['full', 'full', 'auto']}
            p={6}
            gap={2}
            bg="#374C8C"
            _hover={{ bg: '#283765' }}
            color="white"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={4}
          >
            <FontAwesomeIcon icon={faMedium} width="32" />
            <strong>MEDIUM</strong>
          </Button>
        </Link>
      </Flex>
    </Box>
  )
}
