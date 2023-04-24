import { Avatar, Box, Center, Text, VStack } from '@chakra-ui/react'

const CardTeam = ({ image, name, title, profile }) => {
  return (
    <Box
      mx="auto"
      bg="white"
      shadow="xl"
      borderRadius="md"
      alignItems="center"
      p={6}
      height={{ base: 'fit-content', md: '28rem', lg: '24rem' }}
    >
      <Center>
        <VStack alignItems="center">
          <Avatar src={image.src} alt={image} size="2xl" />
          <Text
            fontWeight="semibold"
            fontSize="lg"
            color="#171717"
            opacity={0.68}
          >
            {name}
          </Text>
          <Text fontWeight="bold" color="#FAD02C" align="center">
            {title}
          </Text>
          <Text align="center" fontSize="sm" color="#171717" opacity={0.68}>
            {profile}
          </Text>
        </VStack>
      </Center>
    </Box>
  )
}

export default CardTeam
