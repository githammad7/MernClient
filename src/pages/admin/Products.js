import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
const[products,setproduct]=useState([])
    const getallProducts=async()=>{
        try {
            const{data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
            setproduct(data.products)
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
       
    }
    useEffect(()=>{
        getallProducts()
    },[])
  return (
    <Layout>
         <div className="container p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    
                    <h1 className='text-center'>
                       All Products
                    </h1>
                    <div className="d-flex overflow-scroll  ">
                    {products?.map((p)=>{
                        return <>
                       
                            
                        <Link to={`/dashboard/admin/products/${p.slug}`} className='text-dark text-decoration-none'>
                        <div className="card ms-3" style={{width: '18rem'}} key={p._id} >
                      <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt="Card image cap" />
                    <div className="card-body">
                     <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                      
                        </div>
                        </div></Link>
                        
                        </>

                    })}
                     </div>
                    
                </div>
            </div>
            </div>

    </Layout>
  )
}

export default Products;
