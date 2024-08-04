import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'

const AllUser = () => {
  return (
    <Layout>
      
      <div className="container p-3">
      <div className="row">
        <div className="col-md-3">
         <AdminMenu/>
        </div>
        <div className="col-md-9">
        <h1 className='text-center'>All Users</h1>
        </div>
   
    </div>
    </div>
    </Layout>
  )
}

export default AllUser
