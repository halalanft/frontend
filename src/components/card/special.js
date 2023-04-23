import { Box, Image, Text, VStack } from '@chakra-ui/react'

const CardSpecial = ({ icon, title, description }) => {
  return (
    <Box
      mx="auto"
      bgColor="white"
      boxShadow="xl"
      borderRadius="md"
      p={4}
      w="100%"
      maxW="md"
    >
      <VStack alignItems="start" spacing={4}>
        <Box>
          <Box
            display="inline-flex"
            h={10}
            w={10}
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
            p={2}
            boxShadow="lg"
            bg="#FAD02C"
          >
            <Image src={icon.src} alt={icon} width={20} />
          </Box>
          <Text fontWeight="bold" color="#171717">
            {title}
          </Text>
        </Box>
        <Text color="#171717" opacity="0.68">
          {description}
        </Text>
      </VStack>
    </Box>
  )
}

export default CardSpecial
