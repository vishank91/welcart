import React, { useState } from 'react'
import Breadcrum from '../../Components/Breadcrum'
import TextValidator from '../../Validators/TextValidator'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
    let [data, setData] = useState({
        username: "",
        password: "",
    })
    let [errorMessage, setErrorMessage] = useState("")

    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    async function postData(e) {
        e.preventDefault()
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()

        let item = response.find(x => (x.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.username?.toLocaleLowerCase()) && x.password === data.password)
        if (item) {
            if (item.status === false)
                setErrorMessage("Your Account is Blocked Due To Some UnAuthorised Activity, Please Contact Us To Resume Your Account")
            else {
                localStorage.setItem("login", true)
                localStorage.setItem("name", item.name)
                localStorage.setItem("userid", item.id)
                localStorage.setItem("role", item.role)
                if (item.role === "Buyer")
                    navigate("/profile")
                else
                    navigate("/admin")
            }
        }
        else
            setErrorMessage("Username or Password Is Invalid")
    }
    return (
        <>
            <Breadcrum title="Login To Your Account" />

            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-sm-10 m-auto">
                        <h5 className='bg-primary text-light text-center p-2'>Login To Your Account</h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Username*</label>
                                <input type="text" name="username" onChange={getInputData} className={`form-control ${errorMessage ? 'border-danger' : 'border-primary'}`} placeholder='Username or Email Address' />
                                {errorMessage ? <p className='text-danger text-capitalize'>{errorMessage}</p> : null}
                            </div>

                            <div className="mb-3">
                                <label>Password*</label>
                                <input type="password" name="password" onChange={getInputData} className={`form-control ${errorMessage ? 'border-danger' : 'border-primary'}`} placeholder='Password' />
                            </div>

                            <div className="col-12 mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Login</button>
                            </div>
                        </form>
                        <div className='mb-3 d-flex justify-content-between'>
                            <Link to="#">Forget Password?</Link>
                            <Link to="/signup">Doesn't Have an Account? signup</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
