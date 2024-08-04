import React from 'react'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import { useAuth } from '../../context/AuthProvider'
const AdminDashboard = () => {
  const [auth]=useAuth()
  useEffect(()=>{
    window.scrollTo({ top: 1000, behavior: "smooth" })
    },[])
  return (
    <Layout title={'admin-Dashboard'}>
    <h1 className='text-center'>Admin Dashboard page</h1>
    <div className="container  p-3">
      <div className="row">
        <div className="col-md-3">
        <AdminMenu/>
        </div>
        <div className="col-md-9">
          <div className="card w-75  p-3">
         <h3>Name : {auth?.user.name}</h3>

            <h3>Email :{auth?.user.email}</h3>
           <h3>Phone No :{auth?.user.phone}</h3>

        <h3>Address : {auth?.user.address}</h3>
        </div>
        </div>
        

      </div>
    
    </div>
    </Layout>
  )
}

export default AdminDashboard
