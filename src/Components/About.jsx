import React from 'react'

export default function About() {
    return (
        <>
            <div className="container-fluid pt-6 pb-6">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                            <div className="about-img">
                                <img className="img-fluid w-100" src="/img/banner7.jpg" />
                            </div>
                            <div className="about-img">
                                <img className="img-fluid w-100" src="/img/banner5.jpg" />
                            </div>
                            <div className="about-img">
                                <img className="img-fluid w-100" src="/img/banner10.jpg" />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <h1 className="display-6 text-uppercase mb-4">Your Trusted Destination for Online Shopping</h1>
                            <p className="mb-4 text-justify">We brings quality products, attractive prices, and convenient shopping together, making it easier to discover everyday essentials and lifestyle products from the comfort of your home.</p>
                            <div className="row g-5 mb-4">
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 btn-xl-square bg-light me-3">
                                            <i className="bi bi-bookmark-check fa-2x text-primary"></i>
                                        </div>
                                        <h5 className="lh-base text-uppercase mb-0">100% Genuine Products</h5>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 btn-xl-square bg-light me-3">
                                            <i className="bi bi-person-hearts fa-2x text-primary"></i>
                                        </div>
                                        <h5 className="lh-base text-uppercase mb-0">10000+ Satisfied Customers</h5>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 btn-xl-square bg-light me-3">
                                            <i className="bi bi-arrow-clockwise fa-2x text-primary"></i>
                                        </div>
                                        <h5 className="lh-base text-uppercase mb-0">15 Days Refound Policy</h5>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 btn-xl-square bg-light me-3">
                                            <i className="bi bi-headset fa-2x text-primary"></i>
                                        </div>
                                        <h5 className="lh-base text-uppercase mb-0">24/7 Customer Care Support</h5>
                                    </div>
                                </div>
                            </div>
                            <p>
                                <i className="fa fa-check-square text-primary me-3"></i>
                                Wide range of quality products across multiple categories
                            </p>
                            <p>
                                <i className="fa fa-check-square text-primary me-3"></i>
                                Competitive prices with exciting deals and offers
                            </p>
                            <p>
                                <i className="fa fa-check-square text-primary me-3"></i>
                                Secure payment options for safe online shopping
                            </p>
                            <p>
                                <i className="fa fa-check-square text-primary me-3"></i>
                                Fast and reliable delivery directly to your doorstep
                            </p>
                            <p>
                                <i className="fa fa-check-square text-primary me-3"></i>
                                Customer-focused support for a smooth shopping experience
                            </p>
                            <div className="border border-5 border-primary p-4 text-center mt-4">
                                <h4 className="lh-base text-uppercase mb-0  text-center">Your one-step destination for quality products, great prices, and effortless everyday shopping.</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
