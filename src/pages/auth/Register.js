import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout'
import toast from 'react-hot-toast';

import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const[name,setname]=useState("");
const[email,setemail]=useState("");
const[password,setpassword]=useState("");
const[phone,setphone]=useState("")
const[address,setaddress]=useState("");
const[answer,setAnswer]=useState("");

const navigate=useNavigate()
const handleEvent=async(e)=>{
  e.preventDefault()
  try {
    const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,answer})
    if(res && res.data.success){
      toast.success(res.data && res.data.message)
      navigate('/login')
      
    }else{
      toast.error(res.data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error("Something Went Wrong")
  }


}
useEffect(()=>{
  window.scrollTo({ top: 650, behavior: "smooth" })
  },[])
  return (

    <>
    <Layout>
        <div className="register">
    
        
    <form onSubmit={handleEvent} className='mt-4'>
    <h1 className='text-center'>Register Page</h1> 
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label-md">Name</label>
    <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" value={name}
    onChange={(e)=>{setname(e.target.value)}} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" value={email}
    onChange={(e)=>{setemail(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control form-control-lg" id="exampleInputPassword1"value={password}
    onChange={(e)=>{setpassword(e.target.value)}} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Phone No</label>
    <input type="number" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp"value={phone} 
    onChange={(e)=>{setphone(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
    <input type="text-area" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp"value={address}
    onChange={(e)=>{setaddress(e.target.value)}} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Question</label>
    <input type="text-area" placeholder='What is your nickname ?' className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp"value={answer}
    onChange={(e)=>{setAnswer(e.target.value)}} />
  </div>
 
 
  <button type="submit" className="btn btn-dark mb-4">Submit</button>
</form>

            
      
      </div>
     
      </Layout>
    </>
  )
}

export default Register