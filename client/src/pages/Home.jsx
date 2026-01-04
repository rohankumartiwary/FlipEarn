import React from 'react'
import Hero from '../component/Hero'
import LatestListing from '../component/LatestListing'
import Plans from '../component/Plans'
import CTA from '../component/CTA'
import Footer from '../component/Footer'

const Home = () => {
  return (
    <div>
     <Hero/>
     <LatestListing/>
     <Plans/>
     <CTA/>
     <Footer/>
    </div>
  )
}

export default Home
