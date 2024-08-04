import React, { useState,useEffect } from 'react'
import Layout from '../components/Layout'
import { useSearch } from '../context/SearchProvider'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartProvider'
const Searchpage = () => {
    const[search,setSearch]=useSearch()
    const[cart,setCart]=useCart()
    const navigate=useNavigate()
    useEffect(()=>{
      window.scrollTo({ top: 650, behavior: "smooth" })
      },[])
  return (
    <Layout title={'search-page'}>
        <div className="container">
           <div className="text-center">
            <h1>Search Result</h1>
            <h6>{search?.result.length < 1 ? "No product Found" : `Found ${search?.result.length} Match `}</h6>
            <div className="d-flex flex-wrap">
        {search?.result.map((p)=>{
          return(
            <>
        <div className="card ms-3 mt-3" style={{width: '18rem'}} key={p._id} >
        <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt="Card image cap" />
      <div className="card-body">
       <h5 className="card-title">{p.name}</h5>
          <p className="card-text">{p.description.substring(0,30)}...</p>
          <p className="card-text text-success"><b>Rs:{p.price}</b></p>

          <button  className="btn btn-info me-4" onClick={()=>{navigate(`/product/${p.slug}`)}} >More Details</button>
          <button  className="btn btn-primary" onClick={()=>{
            setCart([...cart,p]);
              localStorage.setItem("cart",JSON.stringify([...cart,p]))
            
            toast.success("item added to cart")
          }}>Add To Cart</button>


          </div>
          </div>
          </>
          )
        })}
        </div>
           </div>
        </div>
      
    </Layout>
  )
}

export default Searchpage
