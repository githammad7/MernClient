import React, {useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartProvider'
const ProductDetails = () => {
    const[products,setProducts]=useState({})
    const [similar,setSimilar]=useState([])
    const [cart,setCart]=useCart()
    const navigate=useNavigate()
    const params=useParams()
    const SingleProduct=async()=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setProducts(data?.products)
            Similarproduct(data?.products._id,data?.products.category._id)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
     if(params?.slug) SingleProduct();
    },[params?.slug])
const Similarproduct=async(pid,cid)=>{
    try {
        const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related/${pid}/${cid}`)
        setSimilar(data?.products)
    } catch (error) {
        console.log(error)
    }
}
  return (
    <Layout>
        <div className="container">
      <div className="row mt-2">
        <div className="col-md-6 "style={{height:"400px",width:"450px"}}>
        <img className="card-img-top "   src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${products._id}`} alt="Card image cap" />

        </div>
        <div className="col-md-6 ">
        <h1 className='text-center mt-5' >PRODUCT DETAILS</h1>
         <h6> <b>Name :</b> {products.name}</h6>
         <h6> <b>Price :</b>  {products.price}</h6>
         <h6> <b>quantity :</b> {products.quantity}</h6>
         <h6> <b>Category :</b> {products?.category?.name}</h6>


       <button className='btn btn-primary btn- mt-3' onClick={()=>{
            setCart([...cart,products]);
              localStorage.setItem("cart",JSON.stringify([...cart,products]))
            
            toast.success("item added to cart")
          }}>Add to Cart</button>

        </div>
        
      </div>
      <div className="row mt-5 ">
        <div className="col-md-8">
            {products.description}
        </div>
      </div>
      <hr/>
      <div className="row">
        <h3> SIMILAR PRODUCTS</h3>
        {similar.length < 1 && (<p> No Similar Product Found</p>)}
        {similar?.map((p)=>{
          return(
            <>
        <div className="card ms-3 mt-3" style={{width: '18rem'}} key={p._id} >
        <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt="Card image cap" />
      <div className="card-body">
       <h5 className="card-title">{p.name}</h5>
          
          <p className="card-text">{p.price}</p>

          <button  className="btn btn-info me-4" onClick={()=>{navigate(`/product/${p.slug}`)}}> More Details</button>


          </div>
          </div>
          </>
          )
        })}
      </div>
      </div>
    </Layout>
  )
}

export default ProductDetails
