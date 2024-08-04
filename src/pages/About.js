import React from 'react'
import Layout from '../components/Layout'


const About = () => {
  return (
    <Layout title={"Ecommerce app-about"}>
      <div className="container">
        <div className="row">
            <div className="col-md-6">
                <img src="images/pic2.jpg" className='mt-4' alt="" />
                
            </div>
            <div className="col-md-6 mt-4">
                <h1 className='bg-dark text-center p-2 text-white'>About us</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum hic ipsa, quas dolor deleniti optio inventore itaque officia. Quisquam, temporibus dolorem modi cum tenetur itaque. Aut sunt vitae voluptatem consequatur laboriosam itaque praesentium officiis porro! Dicta, commodi obcaecati in, sapiente sed asperiores eaque cupiditate repellat explicabo recusandae alias necessitatibus est repudiandae autem ducimus architecto saepe animi provident maxime. Laudantium earum quod, odit rerum repellendus id voluptatem. At, sint! Magni ullam nulla facilis maiores quia at qui soluta dolore iusto, sapiente esse temporibus quasi aliquid totam ab consequuntur nobis veritatis? Deleniti repellendus, accusamus sapiente corporis minima quos ipsum quibusdam voluptate. Assumenda.
                </p>
                <button className='btn btn-dark'>Click Here</button>
               
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
