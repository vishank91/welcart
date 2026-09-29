import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import Breadcrum from '../Components/Breadcrum'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import ProductSlider from '../Components/ProductSlider'

const sliderOptions = {
  effect: 'cube',
  grabCursor: true,
  loop: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  pagination: false,
  modules: [EffectCube],
  className: "mySwiper"
}
export default function ProductPage() {
  let { id } = useParams()
  let [data, setData] = useState({})
  let [releatedProducts, setRelatedProducts] = useState([])

  let ProductStateData = useSelector(state => state.ProductStateData)
  let dispatch = useDispatch()

  useEffect(() => {
    (() => {
      dispatch(getProduct())
      if (ProductStateData.length) {
        let item = ProductStateData.find(x => x.id === id)
        if (item) {
          setData({ ...item })
          setRelatedProducts(ProductStateData.filter(x => x.maincategory === item.maincategory))
        }
        else
          window.history.back()
      }
    })()
  }, [ProductStateData.length, id])
  return (
    <>
      <Breadcrum title={data.name ?? "Product"} />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-6">
            <Swiper {...sliderOptions}>
              {data.pic?.map((item, index) => {
                return <SwiperSlide key={index}>
                  <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`} height={500} width={"100%"} alt="" />
                </SwiperSlide>
              })}
            </Swiper>
          </div>
          <div className="col-md-6">
            <h5 className='bg-primary text-center p-2 text-light'>{data.name}</h5>
            <div className="table-responsive">
              <table className='table table-bordered'>
                <tbody>
                  <tr>
                    <th>Maincategory</th>
                    <td>{data.maincategory}</td>
                  </tr>
                  <tr>
                    <th>Subcategory</th>
                    <td>{data.subcategory}</td>
                  </tr>
                  <tr>
                    <th>Brand</th>
                    <td>{data.brand}</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td><del>&#8377;{data.basePrice}</del> &#8377;{data.finalPrice} {data.discount}% Off</td>
                  </tr>
                  <tr>
                    <th>Stock</th>
                    <td>{data.stock ? `${data.stockQuantity} Letf In Stock` : "Out Of Stock"}</td>
                  </tr>
                  <tr>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>
                      <div dangerouslySetInnerHTML={{ __html: data.description }} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <ProductSlider title="Product" data={releatedProducts} />
        </div>
      </div>
    </>
  )
}
