import { LandingLayout } from '~/components/layout'
import {
  About,
  Hero,
  JoinCommunity,
  Moto,
  OurTeam,
  RoadMap,
  WhatMakes,
} from '~/components/pages/index'
import { useIsMounted } from '~/hooks/useIsMounted'

import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Halalanft</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Hero />
      <About />
      <WhatMakes />
      <Moto />
      <OurTeam />
      <RoadMap />
      <JoinCommunity />
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return <LandingLayout>{page}</LandingLayout>
}
