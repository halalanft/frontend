import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import hero from '~/assets/images/concept_art_2.png'

export default function Hero() {
  return (
    <Box bg="white">
      <Box
        w="full"
        bgGradient="linear(to-t, rgba(250, 208, 44, 0.92), rgba(250, 208, 44, 0))"
        px={8}
        py={16}
      >
        <Flex
          direction={['column', 'column', 'row']}
          alignItems="center"
          justifyContent="space-between"
        >
          <VStack
            alignItems={['center', 'center', 'start']}
            textAlign={['center', 'center', 'left']}
            mb={{ base: '8', md: '0' }}
          >
            <Text
              fontFamily="impact"
              fontSize={['5xl', '5xl', '7xl']}
              lineHeight="shorter"
              color="#171717"
              opacity={0.68}
              width={{ md: '24rem', lg: '32rem' }}
            >
              The First Halal NFTs Collection
            </Text>
            <Text pb={6} fontWeight="semibold" color="#171717" opacity={0.68}>
              That Brings Sharia Based DeFi Ecosystem.
            </Text>
            <Flex direction={['column', 'column', 'row']} gap={6}>
              <Button
                borderRadius="md"
                borderWidth={2}
                borderColor="#374C8C"
                bg="transparent"
                px={{ base: 6, md: 4 }}
                py={2}
                fontSize="md"
                fontWeight="medium"
                color="#374C8C"
                transition="all 0.2s"
                onClick={() =>
                  (window.location.href =
                    'https://drive.google.com/file/d/1IFQS6WDDJk0--Smi2SOknkprZ9IkR5bZ/view?usp=sharing')
                }
                _hover={{
                  borderColor: 'transparent',
                  bg: '#374C8C',
                  color: 'white',
                }}
              >
                Download Whitepaper
              </Button>
              <Link href="/dashboard">
                <Button
                  bg="#374C8C"
                  textColor="white"
                  w="100%"
                  borderWidth={2}
                  borderRadius="lg"
                  borderColor="#374C8C"
                  fontSize="md"
                  fontWeight="medium"
                  transition="all 0.2s"
                  _hover={{
                    borderWidth: '4',
                    borderColor: '#374C8C',
                    bg: 'transparent',
                    color: '#374C8C',
                  }}
                >
                  Enter App
                </Button>
              </Link>
            </Flex>
          </VStack>
          <Image
            src={hero.src}
            alt="Hero"
            width={{ base: '20rem', md: '20rem', lg: '24rem' }}
          />
        </Flex>
      </Box>
    </Box>
  )
}
