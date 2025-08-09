import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSillers from '../components/BestSillers'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSillers />
      <OurPolicy />
      <NewLetterBox />
    </div>
  )
}

export default Home