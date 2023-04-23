import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react'
import divide from '~/assets/images/divide.png'
import roadmapBg from '~/assets/images/roadmap.png'

const RoadMap = () => {
  return (
    <Box
      id="roadmap"
      bg="roadmap"
      minH="100vh"
      w="full"
      px={8}
      py={16}
      bgSize={['contain', 'cover']}
      bgImage={roadmapBg.src}
    >
      <Heading
        className="font-impact"
        mb={8}
        textAlign="center"
        fontSize="4xl"
        color="rgba(23, 23, 23, 0.68)"
      >
        Roadmap to Halalan Ecosystem
      </Heading>
      <Text
        mx="auto"
        mb={16}
        textAlign="center"
        color="rgba(23, 23, 23, 0.68)"
        maxW={['full', 'full', '1/2']}
      >
        Our commitment to build Halal ecosystem around DeFi is really strong. We
        are aiming to have the following roadmap get realized in timely manner
      </Text>

      <Grid
        templateColumns="repeat(3, 1fr)"
        mx={16}
        gap={4}
        alignItems="center"
      >
        <GridItem textAlign="end">
          <Heading className="font-impact" fontSize="3xl">
            Q4-2022
          </Heading>
        </GridItem>
        <GridItem alignContent="center" display="flex" px={32}>
          <Image src={divide.src} alt="divide" maxHeight={64} />
        </GridItem>
        <GridItem textAlign="start">
          <List styleType="decimal" pl={4}>
            <ListItem>Project Set up</ListItem>
            <ListItem>Whitepaper</ListItem>
            <ListItem>Media Social set up: Discord, Twitter, Medium</ListItem>
            <ListItem>NFTs Concept & Design</ListItem>
            <ListItem>1st AMA</ListItem>
            <ListItem>Pre Launch Project</ListItem>
            <ListItem>Pre Launch Campaign</ListItem>
            <ListItem>
              Project Launch: NFTs Minting Phase 1: Public minting.
            </ListItem>
          </List>
        </GridItem>
      </Grid>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={4}
        mx={16}
        alignItems="center"
      >
        <GridItem textAlign="end">
          <List styleType="decimal" pl={4} textAlign="start">
            <ListItem>NFT Market Place</ListItem>
            <ListItem>DAO</ListItem>
            <ListItem>Halalan Academy (Bahasa)</ListItem>
            <ListItem>Blockchain Validator: Avalanche</ListItem>
            <ListItem>Halalan Finance (Yield Optimizer)</ListItem>
            <ListItem>Smartcontract Audit</ListItem>
            <ListItem>Halalanft Clothing Brand</ListItem>
            <ListItem>Offchain Business Partnership</ListItem>
          </List>
        </GridItem>
        <GridItem px={32}>
          <Image src={divide.src} alt="divide" maxHeight={64} />
        </GridItem>
        <GridItem textAlign="start">
          <Heading className="font-impact" fontSize="3xl">
            2023
          </Heading>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default RoadMap
