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
} from '@/components/pages/index'

import Head from 'next/head'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>Halalanft</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Navbar />
      <Hero />
      <About />
      <WhatMakes />
      <Moto />
      <OurTeam />
      <RoadMap />
      <JoinCommunity />
      <Footer />
    </div>
  )
}
