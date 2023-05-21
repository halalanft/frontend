import { Box, Flex, Grid, Text } from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import testJson from '~/assets/dummy/test.json'
import { ipfsDetailsLoader } from '~/utils/loader'

export default function AttributesSection({ selectedToken, setAttrLoaded }) {
  const [dataAttributes, setDataAttributes] = useState([])

  useEffect(() => {
    async function getNFTs() {
      if (process.env.NEXT_PUBLIC_CHAIN === 'fuji') {
        return testJson
      } else {
        try {
          setAttrLoaded(false)
          const response = await fetch(ipfsDetailsLoader(selectedToken))
          const newData = await response.json()
          setDataAttributes(newData.attributes)
          setAttrLoaded(true)
        } catch (error) {
          console.error('Error fetching data:', error)
          setAttrLoaded(false)
        }
      }
    }

    if (selectedToken) {
      getNFTs()
    }
  }, [selectedToken, setAttrLoaded])

  return (
    <Box p={4}>
      {/* Title */}
      <Text fontSize="xl" fontWeight="bold" color="#171717">
        Attributes
      </Text>
      <Box bg="white" w="100%" h="2px" my={4}></Box>
      {/* Card Attributes */}
      <Grid
        templateColumns={{ md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }}
        gap={4}
      >
        {dataAttributes.map(({ trait_type, value }) => (
          <Box
            bg="white"
            shadow="md"
            borderRadius="lg"
            p={{ base: 4, md: 2 }}
            key={trait_type}
          >
            <Flex
              direction={{ base: 'row', md: 'column' }}
              align="center"
              justify="space-between"
              gap={{ base: 4, md: 2 }}
            >
              <Text>{trait_type}</Text>
              <Text>{value}</Text>
            </Flex>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}
