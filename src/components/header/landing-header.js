import {
  Box,
  Collapse,
  Flex,
  Link as ChakraLink,
  HStack,
  VStack,
  Text,
  useDisclosure,
  Hide,
  Center,
  Fade,
  Show,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link as ScrollLink } from 'react-scroll'
import logo from '~/assets/images/fix.png'

export default function LandingHeader() {
  const { isOpen, onToggle } = useDisclosure()
  const [openDoc, setOpenDoc] = useState(false)

  return (
    <>
      <Flex
        zIndex={50}
        w="full"
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        px={8}
        py={6}
        position="sticky"
        top={0}
      >
        <Box>
          <Image src={logo} alt="Logo" width="180" />
        </Box>

        {/* menu */}
        <Show above="lg">
          {' '}
          <HStack spacing={8}>
            <ScrollLink
              className="nav-item"
              to="about"
              smooth={true}
              duration={500}
            >
              About
            </ScrollLink>

            <ScrollLink
              className="nav-item"
              to="why us"
              smooth={true}
              duration={500}
            >
              Why Us
            </ScrollLink>

            <ScrollLink
              className="nav-item"
              to="concept art"
              smooth={true}
              duration={500}
            >
              Concept Art
            </ScrollLink>

            <ScrollLink
              className="nav-item"
              to="team"
              smooth={true}
              duration={500}
            >
              Team
            </ScrollLink>

            <ScrollLink
              className="nav-item"
              to="roadmap"
              smooth={true}
              duration={500}
            >
              Roadmap
            </ScrollLink>

            <ScrollLink
              className="nav-item"
              to="community"
              smooth={true}
              duration={500}
            >
              Community
            </ScrollLink>
            <Box className="dropdown">
              <Text
                className="nav-item"
                _hover={{ textDecoration: 'none' }}
                transition="ease-in-out "
              >
                Documents
              </Text>

              <VStack
                bgColor="white"
                shadow="lg"
                borderRadius="lg"
                p={6}
                zIndex="popover"
                position="absolute"
                display="none"
                className="dropdown-content"
              >
                <ChakraLink
                  isExternal
                  href="https://halalanft-ecosystem.gitbook.io/halalanft-whitepaper-english/"
                  className="nav-item"
                  _hover={{ textDecoration: 'none' }}
                >
                  English
                </ChakraLink>
                <ChakraLink
                  isExternal
                  href="https://halalanft-ecosystem.gitbook.io/halalanft-whitepaper-bahasa/"
                  className="nav-item"
                  _hover={{ textDecoration: 'none' }}
                >
                  Bahasa
                </ChakraLink>
              </VStack>
            </Box>
            <ChakraLink
              className="nav-item"
              _hover={{ textDecoration: 'none' }}
              href="/halalan.finance"
            >
              Halalan.finance
            </ChakraLink>
            {/* Add other ScrollLink components here */}
          </HStack>
        </Show>

        {/* hamburger */}
        <Hide above="lg">
          <HStack onClick={onToggle} zIndex={50} ml={{ base: '24', md: '96' }}>
            {!isOpen ? (
              <FaBars color="rgba(23, 23, 23, 0.68)" />
            ) : (
              <FaTimes color="white" />
            )}
          </HStack>
        </Hide>

        {/* mobile menu */}
        <Hide above="lg">
          <Fade in={isOpen}>
            <VStack
              position="absolute"
              top={0}
              left={0}
              zIndex={20}
              h="100vh"
              w="full"
              alignItems="center"
              justifyContent="center"
              bg="#374C8C"
              spacing={8}
              fontSize="lg"
              color="white"
              p={6}
            >
              <ScrollLink
                className="nav-item"
                to="about"
                smooth={true}
                duration={500}
                onClick={onToggle}
              >
                About
              </ScrollLink>
              <ScrollLink
                className="nav-item"
                to="why us"
                smooth={true}
                onClick={onToggle}
              >
                Why Us
              </ScrollLink>
              <ScrollLink
                className="nav-item"
                to="concept art"
                smooth={true}
                onClick={onToggle}
              >
                Concept Art
              </ScrollLink>
              <ScrollLink
                className="nav-item"
                to="team"
                smooth={true}
                onClick={onToggle}
              >
                Team
              </ScrollLink>
              <ScrollLink
                className="nav-item"
                to="roadmap"
                smooth={true}
                onClick={onToggle}
              >
                Roadmap
              </ScrollLink>
              <ScrollLink
                className="nav-item"
                to="community"
                smooth={true}
                onClick={onToggle}
              >
                Community
              </ScrollLink>
              <Box>
                <Text
                  className="nav-item"
                  onClick={() => setOpenDoc(!openDoc)}
                  _hover={{ textDecoration: 'none' }}
                  transition="ease-in-out "
                >
                  Documents
                </Text>
                {openDoc ? (
                  <VStack
                    bgColor="white"
                    shadow="lg"
                    borderRadius="lg"
                    p={6}
                    position="absolute"
                    zIndex="popover"
                    onClick={onToggle}
                  >
                    <ChakraLink
                      isExternal
                      href="https://halalanft-ecosystem.gitbook.io/halalanft-whitepaper-english/"
                      className="nav-item"
                      _hover={{ textDecoration: 'none' }}
                      textColor="rgba(23, 23, 23, 68%)"
                    >
                      English
                    </ChakraLink>
                    <ChakraLink
                      isExternal
                      href="https://halalanft-ecosystem.gitbook.io/halalanft-whitepaper-bahasa/"
                      className="nav-item"
                      _hover={{ textDecoration: 'none' }}
                      textColor="rgba(23, 23, 23, 68%)"
                    >
                      Bahasa
                    </ChakraLink>
                  </VStack>
                ) : (
                  <></>
                )}
              </Box>
              <ChakraLink
                className="nav-item"
                _hover={{ textDecoration: 'none' }}
                href="/halalan.finance"
              >
                Halalan.finance
              </ChakraLink>
            </VStack>
          </Fade>
        </Hide>
      </Flex>
    </>
  )
}
