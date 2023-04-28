import { Box, Grid, Heading, Text } from '@chakra-ui/react'
import halal from '~/assets/images/halal.svg'
import people from '~/assets/images/people.svg'
import philanthropy from '~/assets/images/philanthropy.svg'
import security from '~/assets/images/security.svg'
import stream from '~/assets/images/stream.svg'
import { CardSpecial } from '~/components/card'

const WhatMakes = () => {
  const SpecialCard = [
    {
      icon: halal,
      title: 'Halal',
      description:
        'In developing and delivering our product, we focused on every halal aspect. We seek halal guidance and certification for Islamic scholars to ensure our NFT holders are comfortable with every protocol project and revenue stream that we develop.',
    },
    {
      icon: security,
      title: 'Security',
      description:
        'Security is our top priority when we develop and deliver Halalanft Web3 products. We aimed to obtain every possible security certification to ensure that our code is well-written and meets high Web3 standards.',
    },
    {
      icon: philanthropy,
      title: 'Philanthropy',
      description:
        'This is something that other Web3 projects are missing. As one of the halal projects, Halalanft will have philanthropic activities to support a broad community (for example, scholarships for Islamic boarding schools, a Web3 project to support the Muslim community, and so on).',
    },
    {
      icon: stream,
      title: 'Revenue Stream',
      description:
        'Unlike many NFT projects present in the market today, Halalanft will become an ecosystem with its own revenue stream for products or services to be provided. Halalanft will be in charge of both the on-chain and off-chain revenue streams.',
    },
    {
      icon: people,
      title: 'DAO',
      description:
        'Halalanft is about community, as any other Web3 project, and depends on the loyalty and dedication of the community. Therefore, we will give NFT holders special access rights to some educational materials and voting rights to submit proposals and vote on proposed proposals.',
    },
  ]

  return (
    <Box id="why us" px={8} py={16} bg="#F2F2F2" minH="full" w="100%">
      <Text
        as="h1"
        fontSize="4xl"
        fontFamily="Impact"
        mb={8}
        color="#171717"
        opacity="0.68"
      >
        What makes{' '}
        <Text as="span" color="#FAD02C">
          Halalanft{' '}
        </Text>
        special
      </Text>
      <Text fontStyle="italic" mb={16} color="#374C8C" w={{ lg: '1/2' }}>
        We focus on 5 things that will be the long-term fundamentals of this
        project, and we call them : House of Halalanft Strategy. Halalanft will
        create a halal ecosystem focused on providing ultimate NFT use cases or
        utilities in order to provide real benefits to holders.
      </Text>
      <Grid
        gap={5}
        autoRows="auto"
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        justifyContent="center"
      >
        {SpecialCard &&
          SpecialCard.map((special, index) => (
            <CardSpecial
              key={index}
              icon={special.icon}
              title={special.title}
              description={special.description}
            />
          ))}
      </Grid>
    </Box>
  )
}

export default WhatMakes
