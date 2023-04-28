import {
  Box,
  Collapse,
  Flex,
  Link as ChakraLink,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link as ScrollLink } from 'react-scroll'
import logo from '~/assets/images/fix.png'

export default function LandingHeader() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Flex
      zIndex={50}
      w="full"
      alignItems="center"
      justifyContent="space-between"
      bg="white"
      px={8}
      py={6}
      position={['static', 'static', 'sticky']}
      top={0}
    >
      <Box>
        <Image src={logo} alt="Logo" width="180" />
      </Box>
      {/* menu */}
      <HStack spacing={8} display={{ base: 'none', md: 'none', lg: 'flex' }}>
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

        <ScrollLink className="nav-item" to="team" smooth={true} duration={500}>
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

        <ChakraLink
          isExternal
          className="nav-item"
          href="https://halalanft-ecosystem.gitbook.io/"
          _hover={{ textDecoration: 'none' }}
        >
          Gitbook
        </ChakraLink>
        {/* Add other ScrollLink components here */}
      </HStack>

      {/* hamburger */}
      <Box
        display={{ base: 'block', md: 'block', lg: 'none' }}
        zIndex={50}
        onClick={onToggle}
      >
        {!isOpen ? (
          <FaBars color="rgba(23, 23, 23, 0.68)" />
        ) : (
          <FaTimes color="white" />
        )}
      </Box>
      {/* mobile menu */}
      <Collapse in={isOpen} animateOpacity>
        <VStack
          position="absolute"
          top={0}
          left={0}
          zIndex={20}
          h="screen"
          w="full"
          alignItems="center"
          justifyContent="center"
          bg="#374C8C"
          spacing={6}
          fontSize="lg"
          color="white"
          p={6}
        >
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
          <ChakraLink
            isExternal
            className="nav-item"
            href="https://halalanft-ecosystem.gitbook.io/"
            _hover={{ textDecoration: 'none' }}
          >
            Gitbook
          </ChakraLink>
        </VStack>
      </Collapse>
    </Flex>
  )
}
