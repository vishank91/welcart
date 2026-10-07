import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import Breadcrum from '../../Components/Breadcrum'

import { getCart, deleteCart, updateCart } from "../../Redux/ActionCreators/CartActionCreators"
export default function CartPage() {
    let [data, setData] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)

    let CartStateData = useSelector(state => state.CartStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are You Sure You Want To Delete That Record?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(deleteCart({ id: id }))
                let cart = data.filter(x => x.id !== id)
                setData(cart)
                calculate(cart)

                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your data has been deleted.",
                    icon: "success"
                });
            }
            else if (result.dismiss === Swal.DismissReason.cancel)
                /* Read more about handling dismissals below */
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your data is safe :)",
                    icon: "error"
                });
        });
    }

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

    function updateRecord(id, option) {
        let item = data.find(x => x.id === id)
        let index = data.findIndex(x => x.id === id)
        if ((item.quantity === 1 && option === "Dec") || (item.quantity === item.stockQuantity && option === "Inc"))
            return
        else if (option === "Dec") {
            item.quantity = item.quantity - 1
            item.total = item.total - item.finalPrice
        }
        else {
            item.quantity = item.quantity + 1
            item.total = item.total + item.finalPrice
        }
        dispatch(updateCart(item))
        data[index] = { ...item }
        calculate(data)
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
            <Breadcrum title="Manage Your Cart" />

            <div className="container my-3">
                {data.length ?
                    <>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Product</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Stock Quantity</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => {
                                        return <tr key={index}>
                                            <td>
                                                <a href={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} target='_blank'>
                                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} height={80} width={80} className='rounded' alt="" />
                                                </a>
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.brand?.name || item.brand}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                            <td>{item.stockQuantity} Left in Stock</td>
                                            <td>&#8377;{item.finalPrice}</td>
                                            <td>
                                                <div className='btn-group' style={{ width: 150 }}>
                                                    <button onClick={() => updateRecord(item.id, 'Dec')} className='btn btn-primary'>
                                                        <i className='bi bi-dash'></i>
                                                    </button>
                                                    <h5 className='w-50 text-center'>{item.quantity}</h5>
                                                    <button onClick={() => updateRecord(item.id, 'Inc')} className='btn btn-primary'>
                                                        <i className='bi bi-plus'></i>
                                                    </button>
                                                </div>
                                            </td>
                                            <td>&#8377;{item.total}</td>
                                            <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-trash'></i></button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-md-6"></div>
                            <div className="col-md-6">
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
                                                <Link to="/checkout" className='btn btn-primary w-100'>Proceed To Checkout</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </> :
                    <div className='card p-5'>
                        <h4 className='text-center'>No Items in Cart</h4>
                        <Link to="/shop" className='btn btn-primary w-25 m-auto'>Shop Now</Link>
                    </div>}
            </div>
        </>
    )
}
