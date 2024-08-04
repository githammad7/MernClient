import React from 'react'
import Layout from '../components/Layout'
import { IoIosMailUnread } from "react-icons/io";
import { IoMdCall } from "react-icons/io";



const Contact = () => {
  return (
    <Layout title={"Ecommerce app-Contact us"}>
      <div className="container">
        <div className="row">
            <div className="col-md-6">
                <img src="images/pic1.jpg" className='mt-4' alt="" />
                
            </div>
            <div className="col-md-6 mt-4">
                <h1 className='bg-dark text-center p-2 text-white'>Contact us</h1>
                <p>
                    any query about product feel free to call at anytime we are available 24X7
                </p>

                <h3 className='mt-4'><IoIosMailUnread/> www.help@ecommerce.com</h3>
                <h3 className='mt-4'><IoMdCall/> 0320-6511045</h3>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
