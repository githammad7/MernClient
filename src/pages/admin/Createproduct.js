import React, { useState ,useEffect} from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios';
import { message, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const {Option}=Select;
const Createproduct = () => {
  const navigate=useNavigate()
  const[categories,setcategory]=useState([])
  const[photo,setphoto]=useState("")
  const[name,setname]=useState("")
  const[category,setCategory]=useState("")

  const[description,setdescription]=useState("")

  const[price,setprice]=useState("")

  const[quantity,setquantity]=useState("")
  const[shipping,setshipping]=useState("")
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
  useEffect(()=>{
    getCategories()
  },[])
  const handlecreate=async(e)=>{
    

    e.preventDefault()
try {
  const productData=new FormData()
  productData.append("name",name)
  productData.append("description",description)

  productData.append("price",price)

  productData.append("quantity",quantity)
  productData.append("photo",photo)

  productData.append("category",category)
const{data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,productData)
if(data?.success){
  toast.success(data?.message)
  navigate("/dashboard/admin/products")

}else{
  
  toast.success("Product created Successfully")
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
      <h1 className='text-center'>Create Product</h1>
      <div className="m-1 w-75">
        <Select bordered={false} size='large' showSearch placeholder="Select Category"
        className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
      {categories?.map((c)=>{
        return(
        <Option key={c._id} value={c._id}>{c.name}</Option>
        )
      })}
        </Select>
      </div>
      <div className="mb-2">
        <label  className='btn btn-outline-secondary col-md-12'>
          {photo ? photo.name:"Upload Photo"}
          <input
          type='file'
          name='photo'
          accept='image/*'
          onChange={(e)=>setphoto(e.target.files[0])}
          hidden/>
        </label>
      </div>
      <div className="mb-2">
        {photo && (
          <div className="text-center">
            <img src={URL.createObjectURL(photo)} alt="product-photo" height={"200px" }
            className='img img-responsive' />
          </div>
        )}
      </div>
      <div className="mb-3">
        <input type="text" className='form-control' placeholder='Enter Product Name' 
        value={name} onChange={(e)=>setname(e.target.value)} />
      </div>
      <div className="mb-3">
        <input type="text" className='form-control' placeholder='Product description' 
        value={description} onChange={(e)=>setdescription(e.target.value)} />
      </div>
      <div className="mb-3">
        <input type="text" className='form-control' placeholder='Enter Product Price' 
        value={price} onChange={(e)=>setprice(e.target.value)} />
      </div>
      <div className="mb-3">
        <input type="text" className='form-control' placeholder='Enter Product Quantity' 
        value={quantity} onChange={(e)=>setquantity(e.target.value)} />
      </div>
      <Select bordered={false} 
      placeholder="Select Shipping"
      size='large'
      showSearch
      className='form-select mb-3'
      onChange={(value)=>setshipping(value)}
      >
        <Option value='1'>Yes</Option>
        <Option value='0'>No</Option>

      </Select>
      
      
      
        <button className='btn btn-primary' onClick={handlecreate}>Create Product</button>
      
      </div>
     
 
  </div>
  </div>
  </Layout>
  )
}

export default Createproduct
