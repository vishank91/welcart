import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"


import About from '../Components/About'
import Feature from '../Components/Feature'
import Banner from '../Components/Banner'
import ProductSlider from '../Components/ProductSlider'
import Products from '../Components/Products'
import Testimonial from '../Components/Testimonial'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import Faq from '../Components/Faq'

export default function HomePage() {
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)

    let dispatch = useDispatch()

    useEffect(() => {
        (() => dispatch(getMaincategory()))()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => dispatch(getProduct()))()
    }, [ProductStateData.length])

    return (
        <>
            <div className="container-fluid p-0 mb-6 wow fadeIn" data-wow-delay="0.1s">
                <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#header-carousel" data-bs-slide-to="0" className="active"
                            aria-current="true" aria-label="Slide 1">
                            <img className="img-fluid" src="/img/banner1.jpg" alt="Image" />
                        </button>
                        <button type="button" data-bs-target="#header-carousel" data-bs-slide-to="1" aria-label="Slide 2">
                            <img className="img-fluid" src="/img/banner2.jpg" alt="Image" />
                        </button>
                        <button type="button" data-bs-target="#header-carousel" data-bs-slide-to="2" aria-label="Slide 3">
                            <img className="img-fluid" src="/img/banner4.jpg" alt="Image" />
                        </button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="w-100" src="/img/banner1.jpg" style={{ height: 600 }} alt="Image" />
                            <div className="carousel-caption">
                                <h1 className="display-1 text-uppercase text-white mb-4 animated zoomIn">Shop Smart, Live Better
                                </h1>
                                <Link to="/shop?mc=Male" className="btn btn-primary py-3 px-4">Explore More</Link>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100" src="/img/banner2.jpg" style={{ height: 600 }} alt="Image" />
                            <div className="carousel-caption">
                                <h1 className="display-1 text-uppercase text-white mb-4 animated zoomIn">Discover More, Shop More
                                </h1>
                                <Link to="/shop?mc=Female" className="btn btn-primary py-3 px-4">Explore More</Link>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100" src="/img/banner4.jpg" style={{ height: 600 }} alt="Image" />
                            <div className="carousel-caption">
                                <h1 className="display-1 text-uppercase text-white mb-4 animated zoomIn">Quality Products, Better Prices
                                </h1>
                                <Link to="/shop?mc=Kids" className="btn btn-primary py-3 px-4">Explore More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <About />
            <Feature />
            <Banner />
            {MaincategoryStateData?.filter(x => x.status).map((item, index) => {
                return <ProductSlider
                    key={index}
                    title={item.name}
                    data={ProductStateData.filter(x => x.status && x.maincategory === item.name)} />
            })}
            <Faq/>
            <Products data={ProductStateData.filter(x=>x.status).slice(0,24)} />

            <Testimonial />
        </>
    )
}
