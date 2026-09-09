import React from 'react'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'

export default function AdminMaincategoryPage() {
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary  text-center p-2 text-light'>Maincategory</h5>
                    </div>
                </div>
            </div>
        </>
    )
}
