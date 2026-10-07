import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../Components/Breadcrum'

import { getCart } from "../../Redux/ActionCreators/CartActionCreators"
export default function CheckoutPage() {
    let [data, setData] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)

    let CartStateData = useSelector(state => state.CartStateData)
    let dispatch = useDispatch()



    function calculate(cart) {
        let subtotal = 0
        cart.forEach(x => subtotal += x.total)
        if (subtotal > 0 && subtotal < 1000) {
            setShipping(150)
            setTotal(subtotal + 150)
        }
        else {
            setShipping(0)
            setTotal(subtotal)
        }
        setSubtotal(subtotal)
    }

    useEffect(() => {
        (() => {
            dispatch(getCart())
            if (CartStateData.length) {
                let cart = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
                setData(cart)
                calculate(cart)
            }
        })()
    }, [CartStateData.length])
    return (
        <>
            <Breadcrum title="Place Order" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <h5 className='bg-primary text-center text-light p-2'>Items in Your Cart</h5>
                        {data.length ?
                            <>
                                <div className='table-responsive'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Brand</th>
                                                <th>Color</th>
                                                <th>Size</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.brand?.name || item.brand}</td>
                                                    <td>{item.color}</td>
                                                    <td>{item.size}</td>
                                                    <td>&#8377;{item.finalPrice}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>&#8377;{item.total}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <table className='table'>
                                    <tbody>
                                        <tr>
                                            <th>Subtotal</th>
                                            <td>&#8377;{subtotal}</td>
                                        </tr>
                                        <tr>
                                            <th>Shipping</th>
                                            <td>&#8377;{shipping}</td>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <td>&#8377;{total}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <button className='btn btn-primary w-100'>Place Order</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </> :
                            <div className='card p-5'>
                                <h4 className='text-center'>No Items in Cart</h4>
                                <Link to="/shop" className='btn btn-primary w-25 m-auto'>Shop Now</Link>
                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
}
