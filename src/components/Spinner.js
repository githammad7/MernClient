import React, { useEffect, useState } from 'react'
import { useNavigate ,useLocation} from 'react-router-dom'

const Spinner = ({path="login"}) => {
    const[count,setCount]=useState(3)
    const navigate=useNavigate()
    const location=useLocation()
    useEffect(()=>{
        const interval=setInterval(()=>{
            setCount((preVal)=>--preVal)
       },1000)
       count===0 && navigate(`/${path}`,{
        state:location.pathname
       })
       return ()=>{clearInterval(interval)}
   
    },[count,navigate,location,path])
  
  return (
    <>
    <div className='d-flex align-items-center flex-column justify-content-center' style={{height:"100vh"}}>
<h1>Redirecting to you at {count} Seconds</h1>
      <div className="spinner-border spinner-border-lg text-dark   " role="status">
  <span className="visually-hidden">Loading...</span>
</div>
</div>

    </>
  )
}

export default Spinner
