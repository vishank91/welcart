import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import Feature from '../Components/Feature'
import Banner from '../Components/Banner'
import Testimonial from '../Components/Testimonial'
import Faq from '../Components/Faq'

export default function FaqPage() {
  return (
    <>
      <Breadcrum title="Faqs"/>
      <Faq/>
      <Feature/>
      <Banner/>
      <Testimonial/>
    </>
  )
}
