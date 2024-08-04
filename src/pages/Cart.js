import React from 'react'
import Layout from '../components/Layout'

import  { useState ,useEffect} from 'react'
import { useCart } from '../context/CartProvider'
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react"
import axios from 'axios'
import toast from 'react-hot-toast'



const Cart = () => {
    const[cart,setCart]=useCart()
    const[auth]=useAuth()
    const[clientToken,setClientToken]=useState("")
    const[instance,setInstance]=useState("")
    const[loading,setLoading]=useState(false)

    const navigate=useNavigate()
    const removeItems=(pid)=>{
      try {
        
        let mycart=[...cart]
        let index=mycart.findIndex((item)=>item._id===pid)
        mycart.splice(index,1)
         setCart(mycart)
         localStorage.setItem('cart',JSON.stringify(mycart))
      } catch (error) {
        console.log(error)
      }
    }
    const totalPrice=()=>{
      let total=0;
      cart?.map((item)=> total=total+item.price)
      return total.toLocaleString("en-US",{
        style:"currency",
        currency:"pkr"
      })
    }
   const getToken=async()=>{
    try {
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`)
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error)
    }
   }
   useEffect(()=>{
    getToken();
   },[auth?.token])
   const handlepayment=async()=>{
      try {
        setLoading(true)
        const{nonce}=await instance.requestPaymentMethod()
        const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,{
          nonce,cart
        })
        setLoading(false)
        localStorage.removeItem('cart')
        setCart([])
        navigate('/dashboard/user/orders')
        toast.success("payment completed  successfully")
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
   }
   useEffect(()=>{
    window.scrollTo({ top: 650, behavior: "smooth" })
    },[])
  return (
    <Layout>
      <div className="container">
        <div className="row">
            <div className="col-md-12">
                <h1 className='text-center mainhead mb-2  bg-light'><b>YOUR CART</b></h1>
                <hr />
                <h3 className='text-center mainhead'>
                   <b> { cart?.length   ?`Hello ! You Have ${cart?.length} items in your cart ${
                        auth?.token ? "":" please login to checkout"
                    }`: ` Your cart is empty`}
                    </b>
                </h3>
            </div>
        </div>
        <div className="row">
            <div className="col-md-8 order--2  order-sm-0">
                {cart?.map((p)=>{
                    return(
                        <>
                        <div className="row  flex-row mt-3">
                            <div className="col-md-3 mb-4">
                            <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt="Card image cap" />

                            </div>
                            <div className="col-md-6 mt-3">
                        <h6 > <b>Name : {p.name}</b></h6>  
                        <h6><b>Price : {p.price}</b></h6>
                          <button className='btn btn-danger' onClick={()=>{
                            removeItems(p._id)
                          }}> Remove</button>

                            </div>
                        </div>
                        </>
                    )
                })}
            </div>
            <div className="col-md-4 ">
              <h2 className='text-center mainhead'><b>CART SUMMARY</b></h2>
            <p className='text-center '><pre>Total     ||     Checkout ||     Payment</pre></p>
            <hr />
            <h3 className='text-center mainhead'  ><b>Total Price :{totalPrice()}</b> </h3>
            <hr />
           {auth?.user?.address ?(
           <>
           <div className="mb-3">
            <h5 className='text-center mainhead'><b>CURRENT ADDRESS</b></h5>
            <p>{auth?.user?.address}</p>
            <button className='btn btn-outline-warning' onClick={()=>{navigate('/dashboard/user/profile')}}>Update Address </button>
           </div>
           </>
           ):(
              <div className="mb-3">
                {
                  auth?.token ?(
                    <button className='btn btn-outline-warning' onClick={()=>{navigate('/dashboard/user/profile')}}>Update Address </button>
                   ):(
                    <button className='btn btn-outline-warning' onClick={()=>{navigate('/login',{state:'/cart'})}}>Please login to checkout </button>

                   )
                }
              </div>
           )
          }
          <div className="mt-2">
            {
              !clientToken || !cart?.length ? ("")
              :(
                <>
<DropIn
            options={{
              authorization:clientToken,
              paypal:{
              flow:"vault"
              }
            }}
            onInstance={instance=>setInstance(instance)}
            />
            <button className='btn btn-primary mb-5' onClick={handlepayment}
             disabled={ !instance || loading || !auth?.user?.address}>
              {loading ? "processing..." : "Make Payment"}
             </button>
             </>
              )
              
            }
            

           
          </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart
