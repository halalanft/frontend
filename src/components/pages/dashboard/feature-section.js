import { Box, Image } from '@chakra-ui/react'
import { ipfsImageLoader } from '~/utils/loader'

export default function FeatureSection({ selectedToken }) {
  return (
    <Box p={4}>
      <Image
        src={ipfsImageLoader(`${selectedToken}.png`)}
        alt={`Token ${selectedToken}`}
        borderRadius="lg"
        w={{ base: '10rem', md: '28rem' }}
      />
    </Box>
  )
}
