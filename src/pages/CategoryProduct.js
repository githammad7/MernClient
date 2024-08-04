import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartProvider'
const CategoryProduct = () => {
    const navigate=useNavigate()
    const[product,setProdut]=useState([])
    const[cart,setCart]=useCart()
    const [category,setCategory]=useState([])
    const params=useParams()
    const getAllproductCategories=async()=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
            setProdut(data?.product)
            setCategory(data?.category)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
      if(params?.slug)  getAllproductCategories()
    },[params?.slug])
    useEffect(()=>{
      window.scrollTo({ top: 650, behavior: "smooth" })
      },[params?.slug])
  return (
    <Layout>
         <h3 className='text-center mt-3'>{category?.name}</h3>
         <p className='text-center'>{product.length} Products Found</p>
        <div className="container">
            <div className="row ">
                <div className="col-md-12 d-flex">
                {product?.map((p)=>{
                        return <>
                       
                            
                        
                        <div className="card ms-3" style={{width: '18rem'}} key={p._id} >
                      <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt="Card image cap" />
                    <div className="card-body">
                     <h5 className="card-title">{p.name.substring(0,25)}</h5>
                        <p className="card-text">{p.description.substring(0,30)}...</p>
                        <button  className="btn btn-info me-4" onClick={()=>{navigate(`/product/${p.slug}`)}} >More Details</button>
                        <button  className="btn btn-primary"onClick={()=>{
            setCart([...cart,p]);
              localStorage.setItem("cart",JSON.stringify([...cart,p]))
            
            toast.success("item added to cart")
          }}>Add To Cart</button>
                        </div>
                        </div>
                        
                        </>

                    })}
                </div>
            </div>
        </div>
     
      
    </Layout>
  )
}

export default CategoryProduct
