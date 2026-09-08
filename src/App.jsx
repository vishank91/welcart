import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"

import HomePage from "./Pages/HomePage"
import AboutPage from "./Pages/AboutPage"
import ShopPage from "./Pages/ShopPage"
import ProductPage from "./Pages/ProductPage"
import FeaturePage from "./Pages/FeaturePage"
import FaqPage from "./Pages/FaqPage"
import TestimonialPage from "./Pages/TestimonialPage"
import ContactUsPage from "./Pages/ContactUsPage"
import ErrorPage from "./Pages/ErrorPage"
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/feature' element={<FeaturePage />} />
        <Route path='/faq' element={<FaqPage />} />
        <Route path='/testimonial' element={<TestimonialPage />} />
        <Route path='/contactus' element={<ContactUsPage />} />

        <Route path='/*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
