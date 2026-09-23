import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import RichTextEditor from '../../../rte/RichTextEditor';
import { createStructuredContent } from '../../../rte/richTextEditorBridge';

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import TextValidator from '../../../Validators/TextValidator'
import ImageValidaror from '../../../Validators/ImageValidaror'

import { createProduct } from "../../../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Redux/ActionCreators/BrandActionCreators"

const colors = ["Black", "White", "Blue", "Red", "Orange", "Gray", "Green", "Pink", "Yellow", "Purple", "Magenta", "N/A"]
const sizes = ["XXXL", "XXL", "XL", "L", "M", "S", "XS", "NB", "26", "28", "30", "32", "34", "36", "38", "40", "42", "N/A"]
export default function AdminProductCreatePage() {
    let editorRef = useRef(null)
    let [description, setDescription] = useState("")

    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: [],
        size: [],
        basePrice: '',
        finalPrice: '',
        discount: '',
        stock: true,
        stockQuantity: "",
        pic: [],
        status: true,
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        color: "Please Select At Least One Color",
        size: "Please Select At Least One Size",
        basePrice: "Base Price Field is Mendatory",
        discount: "Discount Field is Mendatory",
        stockQuantity: "Stock Quantity Field is Mendatory",
        pic: "Pic Field is Mendatory"
    })

    let [show, setShow] = useState(false)

    let navigate = useNavigate()

    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)

    let dispatch = useDispatch()

    function getInputCheckbox(key, value) {
        let arr = data[key]
        if (arr.includes(value))
            arr = arr.filter(x => x !== value)
        else
            arr.push(value)

        setData({ ...data, [key]: arr })
        setErrorMessage({ ...errorMessage, [key]: arr.length === 0 ? `Please Select At Least One ${key}` : "" })
    }

    function getInputData(e) {
        let name = e.target.name
        // let value = name === "pic" ? e.target.files : e.target.value
        let value = name === "pic" ? Array.from(e.target.files).map(file => "product/" + file.name) : e.target.value

        setData({ ...data, [name]: name === "status" || name === "stock" ? (value === "1" ? true : false) : value })
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? ImageValidaror(e) : TextValidator(e) })
    }

    function syncDocument(documentModel, nextHtml) {
        const resolvedHtml = nextHtml !== undefined ? nextHtml : renderHTML(documentModel);
        setDescription(resolvedHtml)
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
        }
        else {
            let bp = parseInt(data.basePrice)
            let d = parseInt(data.discount)
            let sc = parseInt(data.stockQuantity)

            let fp = parseInt(bp - (bp * d / 100))
            let items = {
                ...data,
                maincategory: data.maincategory || MaincategoryStateData[0].name,
                subcategory: data.subcategory || SubcategoryStateData[0].name,
                brand: data.brand || BrandStateData[0].name,
                basePrice: bp,
                discount: d,
                finalPrice: fp,
                stockQuantity: sc,
                description: description
            }
            dispatch(createProduct({ ...items }))

            // let formData = new FormData()
            // formData.append("name", data.name)
            // formData.append("maincategory", data.maincategory||MaincategoryStateData[0].id)
            // formData.append("subcategory", data.subcategory||SubcategoryStateData[0].id)
            // formData.append("brand", data.brand||BrandStateData[0].id)
            // formData.append("basePrice", bp)
            // formData.append("discount", d)
            // formData.append("finalPrice", fp)
            // formData.append("stock", data.stock)
            // formData.append("stockQuantity", sc)
            // formData.append("description", description)
            // data.color?.forEach(item => {
            //     FormData.append("color", item)
            // })
            // data.size?.forEach(item => {
            //     FormData.append("size", item)
            // })
            // data.pic?.forEach(item => {
            //     FormData.append("pic", item)
            // })
            // formData.append("status", data.status)
            // dispatch(createProduct(formData))


            navigate("/admin/product")
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
        })()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
        })()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary  text-center p-2 text-light'>Create Product
                            <Link to="/admin/product"><i className='bi bi-arrow-left text-light float-end'></i></Link>
                        </h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />

                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Maincategory*</label>
                                    <select name="maincategory" onChange={getInputData} className='form-select border-primary'>
                                        {MaincategoryStateData.filter(x => x.status).map((item, index) => {
                                            return <option key={index}>{item.name}</option>
                                            // return <option key={index} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Subcategory*</label>
                                    <select name="subcategory" onChange={getInputData} className='form-select border-primary'>
                                        {SubcategoryStateData.filter(x => x.status).map((item, index) => {
                                            return <option key={index}>{item.name}</option>
                                            // return <option key={index} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Brand*</label>
                                    <select name="brand" onChange={getInputData} className='form-select border-primary'>
                                        {BrandStateData.filter(x => x.status).map((item, index) => {
                                            return <option key={index}>{item.name}</option>
                                            // return <option key={index} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Stock*</label>
                                    <select name="stock" onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">In Stock</option>
                                        <option value="0">Out Of Stock</option>
                                    </select>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label>Base Price*</label>
                                    <input type="number" name="basePrice" onChange={getInputData} placeholder='Base Price' className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-primary'}`} />

                                    {show && errorMessage.basePrice ? <p className='text-danger text-capitalize'>{errorMessage.basePrice}</p> : null}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label>Discount*</label>
                                    <input type="number" name="discount" onChange={getInputData} placeholder='Discount' className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'border-primary'}`} />

                                    {show && errorMessage.discount ? <p className='text-danger text-capitalize'>{errorMessage.discount}</p> : null}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label>Stock Quantity*</label>
                                    <input type="number" name="stockQuantity" onChange={getInputData} placeholder='Stock Quantity' className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-primary'}`} />

                                    {show && errorMessage.stockQuantity ? <p className='text-danger text-capitalize'>{errorMessage.stockQuantity}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Color*</label>
                                    <div className='row border border-primary mx-1 p-2'>
                                        {colors.map((item, index) => {
                                            return <div className='col-xl-2 col-lg-3 col-sm-4 col-6' key={index}>
                                                <input type="checkbox" id={item} onChange={() => getInputCheckbox('color', item)} checked={data.color?.includes(item)} />
                                                <label className='ms-2' htmlFor={item}>{item}</label>
                                            </div>
                                        })}
                                    </div>
                                    {show && errorMessage.color ? <p className='text-danger text-capitalize'>{errorMessage.color}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Size*</label>
                                    <div className='row border border-primary mx-1 p-2'>
                                        {sizes.map((item, index) => {
                                            return <div className='col-xl-2 col-lg-3 col-sm-4 col-6' key={index}>
                                                <input type="checkbox" id={item} onChange={() => getInputCheckbox('size', item)} checked={data.size?.includes(item)} />
                                                <label className='ms-2' htmlFor={item}>{item}</label>
                                            </div>
                                        })}
                                    </div>
                                    {show && errorMessage.size ? <p className='text-danger text-capitalize'>{errorMessage.size}</p> : null}
                                </div>

                                <div className='col-12 mb-3'>
                                    <label>Description</label>
                                    <RichTextEditor
                                        ref={editorRef}
                                        className="editor-host border border-primary"
                                        value={description}
                                        onChange={(nextHtml, editor) => syncDocument(editor.getJSON(), nextHtml)}
                                        style={{ minHeight: 380 }}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" name="pic" multiple onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />

                                    {show && errorMessage.pic ? errorMessage.pic?.split("|").map((error, index) => {
                                        return <p className='text-danger text-capitalize' key={index}>{error}</p>
                                    }) : null}
                                </div>

                                <div className='col-md-6 mb-3'>
                                    <label>Status*</label>
                                    <select name="status" onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <button type="submit" className='btn btn-primary w-100'>Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
