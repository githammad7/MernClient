import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios'
import { useAuth } from '../../context/AuthProvider'
import moment from "moment"
import { Select } from 'antd'
const {Option}= Select

const AdminOrders = () => {
    const[status,setStatus]=useState(["Not Process","Processing","Shipped","Deliverd","Cancel"])
    const[changestate,setChangestate]=useState("")
    const[orders,setOrders]=useState([])
  const[auth]=useAuth()
  const getOrder=async()=>{
    try {
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`)
         setOrders(data)
    } catch (error) {
      console.log(error)
    }
    
  }
  useEffect(()=>{
   if(auth?.token) getOrder()
  },[auth?.token])
const handleChange=async(orderId,value)=>{
    try {
        const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/orders-status/${orderId}`,{
            status:value,
        });
        getOrder();
    } catch (error) {
        console.log(error)
    }
}
  return (
    <Layout>
      
      <div className="container ">
      <div className="row">
        <div className="col-md-3">
         <AdminMenu/>
        </div>
        <div className="col-md-9">
        <h1 className='text-center'>All Orders</h1>
        {orders?.map((o,i)=>{
              return (
             
              <div className="border shadow">
              <table className='table'>
                <thead>
                  <tr>
                  <th scope='col'>#</th>

                  <th scope='col'>Status</th>
                  <th scope='col'>Buyer Name</th>
                  <th scope='col'>Order Date</th>

                  <th scope='col'>Payment</th>
                  <th scope='col'>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                        <Select bordered={false} onChange={(value)=>handleChange(o._id,value)} defaultValue={o?.status}>
                          {status.map((s,i)=>{
                            return(
                            <Option key={i} value={s}>{s}</Option>
                            )
                          })}
                        </Select>
                    </td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createdAt).fromNow()}</td>

                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>




                  </tr>
                </tbody>
              </table>
              <div className="container">
              {o?.products.map((p)=>{
                    return(
                        <>
                        <div className="row card flex-row mt-3">
                            <div className="col-md-3 mb-4">
                            <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt="Card image cap" />

                            </div>
                            <div className="col-md-6 mt-3">
                        <h6>Name : {p.name}</h6>  
                        <h6>Description : {p.description.substring(0,90)}...</h6>
                        <h6>Price : {p.price}</h6>
                          

                            </div>
                        </div>
                        </>
                    )
                })}
              </div>
              </div>
              )
             })}

        </div>
   
    </div>
    </div>
    </Layout>
  )
}

export default AdminOrders
