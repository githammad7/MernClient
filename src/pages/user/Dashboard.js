import React from 'react'
import Layout from '../../components/Layout'
import UserAdmin from '../../components/UserMenu'
import { useState ,useEffect } from 'react'
import { useAuth } from '../../context/AuthProvider'
const Dashboard = () => {
  const[name,setname]=useState("");
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("");
  const[phone,setphone]=useState("")
  const[address,setaddress]=useState("");
    const[auth,setAuth]=useAuth()
    useEffect(()=>{
      const {name ,email ,phone,address}=auth?.user;
      setname(name)
      setemail(email)
      setphone(phone)
      setaddress(address)
    },[auth?.user])
    useEffect(()=>{
      window.scrollTo({ top: 650, behavior: "smooth" })
      },[])
  return (
    <>
    <Layout title={'Dashboard'}>
    <div className="container  p-3">
      <div className="row">
        <div className="col-md-3">
          <UserAdmin/>
        </div>
        <div className="col-md-9">
        <h1>Dashboard page</h1>
        <h3>Name : {name}</h3>
        <h3>Email : {email}</h3>
        <h3>Phone No : {phone}</h3>
        <h3>Address : {address}</h3>

        </div>
      </div>
    </div>
    </Layout>
      
    </>
  )
}

export default Dashboard
