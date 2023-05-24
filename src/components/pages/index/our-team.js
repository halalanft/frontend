import { Box, Grid, Heading, Text } from '@chakra-ui/react'
import andika from '~/assets/images/andika.png'
import fida from '~/assets/images/fida.png'
import iwan from '~/assets/images/iwan.png'
import mirzam from '~/assets/images/mirzam.png'
import rama from '~/assets/images/rama.png'
import ryan from '~/assets/images/ryan.png'
import { CardTeam } from '~/components/card'

export default function OurTeam() {
  const ourTeam = [
    {
      image: fida,
      name: 'Fida Munadzir',
      title: 'Sharia Advisor',
      profile:
        'Fida Munadzir is a well-known islamic scholar in Indonesia. He has written 3 (three) books related to Islamic perspective on blockchain and cryptocurrencies',
    },
    {
      image: iwan,
      name: 'Iwan',
      title: 'Co-Founder & Business Development Manager',
      profile:
        'Iwan is a Halal Web3 enthusiast, he has broad experience in business management and supply chain. Recently, he has interested in exploring crypto space especially in DeFi, NFT, and Tokenomics. Halalanft is his first project in the web3 space, and he believe Halalanft will be the first Halal NFT project that will bring long term benefit for Web3 communities globally',
    },
    {
      image: rama,
      name: 'Rama',
      title: 'Operations Manager',
      profile:
        'More than 10 years of experience in diverse organizations and communities, both in national and international level, engaging and connecting people from various background, supported his knowledge of project management, surely help him to manage several projects related to Halalanft',
    },
    {
      image: andika,
      name: 'Andika',
      title: 'Co-Founder',
      profile:
        'After several years working on blockchain and Web3 projects, Riyan realize that Web3 space need halal ecosystem to attract Muslim community to this emerging technology.',
    },
    {
      image: mirzam,
      name: 'Mirzam Avicena',
      title: 'UI/UX Designer',
      profile:
        'Muslim graphic designer with more than 2 years experience. His passion is in ui/ux design and development. Together with his expertise and our resource, halalanft will become the best halal ecosystem by providing user experience and user interface to the protocol as well as its utility project',
    },
    {
      image: ryan,
      name: 'Ryan',
      title: 'Community & Marketing Manager',
      profile: `Ryan have almost 3 years of experience in NFTs spaces who love building a sophisticated and engaged community that's all about onboarding people to the NFT revolution. Also, he's an NFTs investor, trader, and degen.`,
    },
  ]
  return (
    <Box id="team" bg="white" px={8} py={16} minH="100vh" w="full">
      <Text
        mb={8}
        textAlign="center"
        fontSize="4xl"
        color="rgba(23, 23, 23, 0.68)"
        fontFamily="Impact"
      >
        Our Team
      </Text>
      <Text
        mx="auto"
        mb={16}
        textAlign="center"
        color="rgba(23, 23, 23, 0.68)"
        maxW={['full', 'full', '1/2']}
      >
        Our team consist of professionals with broad knowledge in both Web2 and
        Web3 spaces. We are doxxed ourself as a proof of our commitment for this
        project.
      </Text>
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']}
        gap={5}
        justifyContent="center"
        alignItems="start"
        rowGap={5}
      >
        {ourTeam &&
          ourTeam.map((team, index) => (
            <CardTeam
              key={index}
              image={team.image}
              name={team.name}
              title={team.title}
              profile={team.profile}
            />
          ))}
      </Grid>
    </Box>
  )
}
