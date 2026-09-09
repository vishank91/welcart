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
import AdminHomePage from './Pages/Admin/AdminHomePage'
import AdminMaincategoryPage from './Pages/Admin/Maincategory/AdminMaincategoryPage'
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

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminHomePage />} />

        <Route path='/admin/maincategory' element={<AdminMaincategoryPage />} />

        <Route path='/*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
