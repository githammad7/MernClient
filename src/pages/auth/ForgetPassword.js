import React, { useState } from 'react'
import Layout from '../../components/Layout'
import toast from 'react-hot-toast';

import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const ForgetPassword = () => {

    const[email,setemail]=useState("");
    const[newpassword,setnewpassword]=useState("");
    const[answer,setAnswer]=useState("");


    
    const navigate=useNavigate()
    const handleEvent=async(e)=>{
      e.preventDefault()
      try {
        const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth//forget-password`,{email,answer,newpassword})
        if(res && res.data.success){
          toast.success(res.data && res.data.message)
        
          navigate( '/')
          
        }else{
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error("Something Went Wrong")
      }
    
    
    }
  return (
    <>
      <Layout>
        <div className="register">
    
      
    <form onSubmit={handleEvent}>
    
    <h1 className='text-center'>RESET PASSWORD</h1>  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email:</label>
    <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" value={email}
    onChange={(e)=>{setemail(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Answer:</label>
    <input type="text" className="form-control form-control-lg" placeholder='What is your Nickname' id="exampleInputEmail1" aria-describedby="emailHelp" value={answer}
    onChange={(e)=>{setAnswer(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">New Password:</label>
    <input type="password" className="form-control form-control-lg" id="exampleInputPassword1"value={newpassword}
    onChange={(e)=>{setnewpassword(e.target.value)}} />
  </div>
  <button type="submit" className="btn btn-dark mb-4">RESET</button> <br/>
</form>

            
      
      </div>
     
      </Layout>
    </>
  )
}

export default ForgetPassword
