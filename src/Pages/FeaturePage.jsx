import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import Feature from '../Components/Feature'
import Banner from '../Components/Banner'
import Testimonial from '../Components/Testimonial'

export default function FeaturePage() {
  return (
    <>
      <Breadcrum title="Our Features"/>
      <Feature/>
      <Banner/>
      <Testimonial/>
    </>
  )
}
