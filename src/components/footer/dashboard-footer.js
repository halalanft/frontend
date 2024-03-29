import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import { FaDiscord, FaInstagram, FaMedium, FaTwitter } from 'react-icons/fa'
import logo from '~/assets/images/fix.png'

export default function DashboardFooter() {
  return (
    <Box as="footer" id="contact" px={4} py={8} aria-label="Site Footer">
      <Box maxW="7xl" mx="auto" w="full">
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={{ base: 4, md: 4, lg: 12 }}
          px={[8, 16]}
        >
          <GridItem>
            <Flex
              direction="column"
              spacing={16}
              justifyContent="space-between"
            >
              <Link href="/" _hover={{ textDecoration: 'none' }}>
                <Image src={logo.src} alt="Logo" w={60} h="auto" />
              </Link>
              <Flex
                alignItems="center"
                spacing={2}
                justifyContent="space-between"
                maxWidth="80%"
                py={4}
              >
                <Link href="https://twitter.com/halalanft" isExternal>
                  <FaTwitter color="#374C8C" size={25} />
                </Link>
                <Link href="https://www.instagram.com/halalanft/" isExternal>
                  <FaInstagram color="#374C8C" size={25} />
                </Link>
                <Link href="https://medium.com/@halalanft" isExternal>
                  <FaMedium color="#374C8C" size={25} />
                </Link>
                <Link href="https://discord.com/invite/be5fnEqrZQ" isExternal>
                  <FaDiscord color="#374C8C" size={25} />
                </Link>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem>
            <Heading
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="semibold"
              color="#363755"
              my={2}
            >
              Sitemap
            </Heading>
            <Flex
              mb={6}
              gap={{ base: 2, md: 8 }}
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight="semibold"
              color="#363755"
              justify="space-between"
              flexWrap="wrap"
            >
              <Link href="/" _hover={{ textDecoration: 'none' }}>
                Home
              </Link>
              <Link href="/#about" _hover={{ textDecoration: 'none' }}>
                About
              </Link>
              <Link href="/#team" _hover={{ textDecoration: 'none' }}>
                Team
              </Link>
              <Link href="/#roadmap" _hover={{ textDecoration: 'none' }}>
                Roadmap
              </Link>
              <Link href="/#community" _hover={{ textDecoration: 'none' }}>
                Community
              </Link>
            </Flex>
            <Flex direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Text>© Copyright 2022 Halalanft. All Rights Reserved</Text>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  )
}
