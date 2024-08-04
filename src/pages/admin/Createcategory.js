import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import Categoryform from '../../components/form/Categoryform'
import Modal from 'antd/es/modal/Modal'
const Createcategory = () => {
  const[categories,setcategory]=useState([])
  const[name,setName]=useState("")
  const[visible,setvisible]=useState(false)
  const[selected,setselected]=useState(null)
  const[updatedname,setupdatedname]=useState("")
  const getCategories=async()=>{
    try {
      const{data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if(data?.success){
        setcategory(data?.getcategory)
      }
    } catch (error) {
      console.log(error)
       toast.error("something went wrong")
    }
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const{data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name})
      if(data.success){
        toast.success(`${name} is created`)
        getCategories()
      }
    } catch (error) {
      console.log(error)
      toast.error()
    }
  }
  useEffect(()=>{
    getCategories()
  },[])
////updated 
const handleUpdate=async(e)=>{
  e.preventDefault()
  try {
    const{data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updatedname})
 if(data.success){
  toast.success("Updated Successfully")
  setselected(null)
  setupdatedname("")
  setvisible(false)
  getCategories()
 }
  } catch (error) {
    console.log(error)
    toast.error("Something Went Wrong")
  }
}
/// delete
const handleDelete=async(pid)=>{
  try {
    const{data}=await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`)
    if(data.success){
      toast.success(` deleted successfully`)
      getCategories()
    }
  } catch (error) {
    console.log(error)
    toast.error(error)
  }
}

  return (
   
      
      <Layout>
      
      <div className="container  p-3">
      <div className="row">
        <div className="col-md-3">
         <AdminMenu/>
        </div>
        <div className="col-md-9">
        <h1 className='text-center'>All Category</h1><br/>
        <Categoryform handleSubmit={handleSubmit} value={name} setValue={setName}/>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">NAME</th>
      <th scope="col">ACTION</th>
      <th scope="col"></th>

    </tr>
  </thead>
  <tbody>
    
    
      {categories?.map((c)=>
        (<>
          <tr>
          
          <td key={c._id}>{c.name}</td>
          
          <td><button className='btn btn-primary ms-2' onClick={()=>{setvisible(true);setupdatedname(c.name);
            setselected(c)
          }} >EDIT</button></td>
          <td><button className='btn btn-danger ms-2 ' onClick={()=>{handleDelete(c._id)}}>DELETE</button></td>
          </tr>
          </>
        )
      )}

   
  </tbody>
</table>
        </div>
   <Modal onCancel={()=>{setvisible(false)}} footer={null} visible={visible}><Categoryform value={updatedname} setValue={setupdatedname} handleSubmit={handleUpdate}/></Modal>
    </div>
    </div>
    </Layout>

  )
}

export default Createcategory
