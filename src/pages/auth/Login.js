import React, { useState  ,useEffect} from 'react'
import Layout from '../../components/Layout'
import toast from 'react-hot-toast';

import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';


const Login = () => {

    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const[auth,setAuth]=useAuth()
    
    const navigate=useNavigate()
    const location=useLocation()
    const handleEvent=async(e)=>{
      e.preventDefault()
      try {
        const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password})
        if(res && res.data.success){
          toast.success(res.data && res.data.message)
         setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token

         })
         localStorage.setItem('auth',JSON.stringify(res.data))
          navigate(location.state || '/')
          
        }else{
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error("Invalid login")
      }
    
    
    }
    useEffect(()=>{
    window.scrollTo({ top: 1000, behavior: "smooth" })
    },[])
  return (
    <>
      <Layout>
        <div className="register">
    
         


    <form onSubmit={handleEvent}>
    
    <h1 className='text-center '>Login Page</h1>  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email:</label>
    <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" value={email}
    onChange={(e)=>{setemail(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
    <input type="password" className="form-control form-control-lg" id="exampleInputPassword1"value={password}
    onChange={(e)=>{setpassword(e.target.value)}} />
  </div>
  <button type="submit" className="btn btn-dark mb-4">Login</button> <br/>
  <button type="submit" className="btn btn-dark mb-4" onClick={()=>{navigate('/forget-password')}}>Forget Password</button>
</form>

            
          </div>

     
      </Layout>
    </>
  )
}

export default Login
