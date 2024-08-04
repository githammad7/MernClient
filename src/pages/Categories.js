import React from 'react'
import useCategory from '../hooks/useCategory'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories =useCategory()
    useEffect(()=>{
      window.scrollTo({ top: 650, behavior: "smooth" })
      },[])
  return (
    <Layout>
      <h1 className='text-center mainhead'><b>ALL CATEGORIES</b></h1>
      <div className="container-fluid">
        <div className="row text-center">
            <div className="col-md-12 ">
            {categories?.map((c)=>{
        return(
       <Link to={`/category/${c.slug}`}><button className='btn btn-dark category-bt  me-4 '>{c.name}</button></Link>
        )
      })}
      </div>
      </div>
      </div>
      
    </Layout>
  )
}

export default Categories
