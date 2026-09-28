import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import SingleProduct from './SingleProduct';
const sliderOptions = {
    grabCursor: true,
    loop: true,
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
    },
    pagination: false,
    className: "mySwiper"
}
export default function ProductSlider({ title, data }) {
    return (
        <>
            <div className="container-fluid service pt-6 pb-6">
                <div className="container">
                    <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>
                        <h1 className="display-6 text-uppercase mb-5">Latest Products For {title}</h1>
                    </div>
                    <div className="row g-4">
                        <Swiper {...sliderOptions}>
                            {data.map((item, index) => {
                                return <SwiperSlide key={index}>
                                    <SingleProduct item={item} />
                                </SwiperSlide>
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}
