import { Box, Flex, Image, Stack, Text, Grid } from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import logo from '~/assets/images/fix.png'
import { ipfsDetailsLoader } from '~/utils/loader'

export default function AttributesSection({ selectedToken, setAttrLoaded }) {
  const [dataAttributes, setDataAttributes] = useState([])

  useEffect(() => {
    async function getNFTs() {
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
      <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={4}>
        {dataAttributes.map(({ trait_type, value }) => (
          <Box bg="white" shadow="md" borderRadius="lg" p={4} key={trait_type}>
            <Flex
              direction="row"
              align="center"
              justify="space-between"
              gap={4}
            >
              <Image src={logo.src} alt="Sample" w={16} borderRadius="sm" />

              <Flex direction="column" align="center" gap={2}>
                <Text>{trait_type}</Text>
                <Text>{value}</Text>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}
