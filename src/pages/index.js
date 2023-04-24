import {
  About,
  Footer,
  Hero,
  JoinCommunity,
  Moto,
  Navbar,
  OurTeam,
  RoadMap,
  WhatMakes,
} from '~/components/pages/index'
import { LandingLayout } from '~/components/layout'

import Head from 'next/head'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
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
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return <LandingLayout>{page}</LandingLayout>
}
