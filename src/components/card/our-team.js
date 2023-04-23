import { Avatar, Box, Center, Text, VStack } from '@chakra-ui/react'

const CardTeam = ({ image, name, title, profile }) => {
  return (
    <Box
      className="card"
      mx="auto"
      bg="white"
      shadow="xl"
      borderRadius="md"
      alignItems="center"
      p={4}
    >
      <Center>
        <VStack alignItems="center">
          <Avatar src={image.src} alt={image} size="2xl" />
          <Text fontSize="lg" color="#171717" opacity={0.68}>
            {name}
          </Text>
          <Text fontWeight="bold" color="#FAD02C">
            {title}
          </Text>
          <Text fontSize="sm" color="#171717" opacity={0.68}>
            {profile}
          </Text>
        </VStack>
      </Center>
    </Box>
  )
}

export default CardTeam
