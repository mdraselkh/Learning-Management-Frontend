import React from 'react'
import Categories from './Categories'
import UnlockingPotential from './UnlockingPotential'
import Courses from './Courses'
import OfferSection from './OfferSection'
import Testimonial from './Testimonial'
import BlogSection from './BlogSection'
import WhyWeAre from './WhyWeAre'

const HomePage = () => {
  return (
    <div>
        <Categories/>
        <UnlockingPotential/>
        <Courses/>
        <OfferSection/>
        <Testimonial/>
        <BlogSection/>
        <WhyWeAre/>
    </div>
  )
}

export default HomePage