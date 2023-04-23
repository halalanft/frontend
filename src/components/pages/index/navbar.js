import { Box, Link as ChakraLink, Flex, HStack, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link as ScrollLink } from 'react-scroll'
import logo from '~/assets/images/fix.png'

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const handleClick = () => {
    setNav(!nav)
  }

  const menuItemProps = {
    color: 'rgba(23, 23, 23, 0.68)',
    _hover: { color: '#FAD02C' },
  }

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
        <Image src={logo} alt="Logo" width={150} />
      </Box>
      {/* menu */}
      <HStack spacing={8} display={['none', 'none', 'flex']}>
        <ScrollLink to="about" smooth={true} duration={500}>
          <ChakraLink {...menuItemProps}>About</ChakraLink>
        </ScrollLink>

        <ScrollLink to="why us" smooth={true} duration={500}>
          <ChakraLink {...menuItemProps}>Why Us</ChakraLink>
        </ScrollLink>

        <ScrollLink to="concept art" smooth={true} duration={500}>
          <ChakraLink {...menuItemProps}>Concept Art</ChakraLink>
        </ScrollLink>

        <ScrollLink to="team" smooth={true} duration={500}>
          <ChakraLink {...menuItemProps}>Team</ChakraLink>
        </ScrollLink>

        <ScrollLink to="roadmap" smooth={true} duration={500}>
          <ChakraLink {...menuItemProps}>Roadmap</ChakraLink>
        </ScrollLink>

        <ScrollLink to="community" smooth={true} duration={500}>
          <ChakraLink {...menuItemProps}>Community</ChakraLink>
        </ScrollLink>

        <ScrollLink
          to="https://halalanft-ecosystem.gitbook.io/"
          smooth={true}
          duration={500}
        >
          <ChakraLink {...menuItemProps}>Gitbook</ChakraLink>
        </ScrollLink>
        {/* Add other ScrollLink components here */}
      </HStack>

      {/* hamburger */}
      <Box
        display={['block', 'block', 'none']}
        zIndex={50}
        onClick={handleClick}
      >
        {!nav ? (
          <FaBars color="rgba(23, 23, 23, 0.68)" />
        ) : (
          <FaTimes color="white" />
        )}
      </Box>
      {/* mobile menu */}
      <VStack
        display={!nav ? 'none' : 'flex'}
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
        fontSize="2xl"
        color="white"
      >
        <ScrollLink to="about" smooth={true} duration={500}>
          <ChakraLink _hover={{ color: '#374C8C' }}>About</ChakraLink>
        </ScrollLink>
        <ScrollLink to="why us" smooth={true} duration={500}>
          <ChakraLink _hover={{ color: '#374C8C' }}>Why Us</ChakraLink>
        </ScrollLink>
        <ScrollLink to="concept art" smooth={true} duration={500}>
          <ChakraLink _hover={{ color: '#374C8C' }}>Concept Art</ChakraLink>
        </ScrollLink>
        <ScrollLink to="team" smooth={true} duration={500}>
          <ChakraLink _hover={{ color: '#374C8C' }}>Team</ChakraLink>
        </ScrollLink>
        <ScrollLink to="roadmap" smooth={true} duration={500}>
          <ChakraLink _hover={{ color: '#374C8C' }}>Roadmap</ChakraLink>
        </ScrollLink>
        <ScrollLink to="community" smooth={true} duration={500}>
          <ChakraLink _hover={{ color: '#374C8C' }}>Community</ChakraLink>
        </ScrollLink>
        <ScrollLink
          to="https://halalanft-ecosystem.gitbook.io/"
          smooth={true}
          duration={500}
        >
          <ChakraLink _hover={{ color: '#374C8C' }}>Gitbook</ChakraLink>
        </ScrollLink>
      </VStack>
    </Flex>
  )
}

export default Navbar
