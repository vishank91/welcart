import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import TextValidator from '../../../Validators/TextValidator'
import ImageValidaror from '../../../Validators/ImageValidaror'

export default function AdminMaincategoryUpdatePage() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        pic: "",
        status: true,
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: ""
    })

    let [show, setShow] = useState(false)

    let navigate = useNavigate()

    let [MaincategoryStateData, setMaincategoryStateData] = useState([])

    function getInputData(e) {
        let name = e.target.name
        // let value = name === "pic" ? e.target.files[0] : e.target.value
        let value = name === "pic" ? "maincategory/" + e.target.files[0].name : e.target.value

        setData({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? ImageValidaror(e) : TextValidator(e) })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
        }
        else {
            let item = MaincategoryStateData.find(x => x.id !== id && x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage({ ...errorMessage, name: "Maincategory With This Name is Already Exist" })
                return
            }
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/maincategory/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...data })
            })
            response = await response.json()
            if (response) {
                navigate("/admin/maincategory")
            }
            else
                alert(`Internal Server Error`)
        }
    }

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/maincategory`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            let item = response.find(x => x.id === id)
            if (item) {
                setData({ ...data, ...item })
                setMaincategoryStateData(response)
            }
            else
                navigate("/admin/maincategory")
        })()
    }, [])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary  text-center p-2 text-light'>Update Maincategory
                            <Link to="/admin/maincategory"><i className='bi bi-arrow-left text-light float-end'></i></Link>
                        </h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />

                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name="pic" onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />

                                    {show && errorMessage.pic ? <p className='text-danger text-capitalize'>{errorMessage.pic}</p> : null}
                                </div>

                                <div className='col-md-6 mb-3'>
                                    <label>Status*</label>
                                    <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <button type="submit" className='btn btn-primary w-100'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
