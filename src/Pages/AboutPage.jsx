import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import About from '../Components/About'
import Feature from '../Components/Feature'
import Banner from '../Components/Banner'
import Testimonial from '../Components/Testimonial'

export default function AboutPage() {
  return (
    <>
      <Breadcrum title="About Us"/>
      <About/>
      <Feature/>
      <Banner/>
      <Testimonial/>
    </>
  )
}
