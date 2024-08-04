import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import UserAdmin from '../../components/UserMenu'
import { useAuth } from '../../context/AuthProvider'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
const Profile = () => {
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
    const handleEvent=async(e)=>{
      
      e.preventDefault()
      try {
        const{data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,{
          name,email,password,phone,address
        })
        if(data?.error){
          toast.error(data?.error)
        }else{
          setAuth({...auth, user:data?.Updateduser})
          let ls=localStorage.getItem('auth')
          ls=JSON.parse(ls)
          ls.user=data?.Updateduser
          localStorage.setItem('auth',JSON.stringify(ls));
          toast.success("Update Successfully")
        }
      } catch (error) {
        console.log(error)
        toast.error("Something Went Wrong")
      }
    
    
    }
  return (
    <Layout>
      <div className="container p-3">
        <div className="row">
        <div className="col-md-3">
                <UserAdmin/>
            </div>
            <div className="col-md-9">
          <div className="redgister">
    <form onSubmit={handleEvent} className='mt-4'>
    <h1 className='text-center'>Profile</h1> 
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label-md">Name</label>
    <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" value={name}
    onChange={(e)=>{setname(e.target.value)}} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" className="form-control form-control-lg" disabled id="exampleInputEmail1" aria-describedby="emailHelp" value={email}
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
  
 
 
  <button type="submit" className="btn btn-dark mb-4">Update</button>
</form>

</div>      
</div>
      </div>
      </div>
    </Layout>
  )
}

export default Profile
