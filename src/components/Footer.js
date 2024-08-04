import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-dark text-light p-3 text-center footer'>
    <h4 >All Right Reserverd ✔ Hammad</h4>
   <p>
   <Link to="/about">About</Link> | 
    <Link to="/contact">Contact Us</Link> | 
    <Link to="/policy">Policy</Link>

   </p>
   </div>
  )
}

export default Footer
