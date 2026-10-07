import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import { getWishlist, deleteWishlist } from "../../Redux/ActionCreators/WishlistActionCreators"
export default function Wishlist() {
    let [data, setData] = useState([])

    let WishlistStateData = useSelector(state => state.WishlistStateData)
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

                dispatch(deleteWishlist({ id: id }))
                setData(data.filter(x => x.id !== id))

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

    useEffect(() => {
        (() => {
            dispatch(getWishlist())
            if (WishlistStateData.length) {
                setData(WishlistStateData.filter(x => x.user === localStorage.getItem("userid")))
            }
        })()
    }, [WishlistStateData.length])
    return (
        data.length ?
            <div className='table-responsive'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Stock Quantity</th>
                            <th></th>
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
                                <td>{item.color?.join(", ")}</td>
                                <td>{item.size?.join(", ")}</td>
                                <td>&#8377;{item.finalPrice}</td>
                                <td>{item.stockQuantity} Left in Stock</td>
                                <td><Link to={`/product/${item.product}`} className='btn btn-primary'><i className='bi bi-cart-plus'></i></Link></td>
                                <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-trash'></i></button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div> :
            <div className='card p-5'>
                <h4 className='text-center'>No Items in Wishlist</h4>
                <Link to="/shop" className='btn btn-primary w-25 m-auto'>Shop Now</Link>
            </div>
    )
}
