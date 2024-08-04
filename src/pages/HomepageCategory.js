import React from 'react'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomepageCategory = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
    const categories =useCategory()
  return (
    <>
      <h1 className='text-center mainhead'><b>ALL CATEGORIES</b></h1>
            
            <div className=" ms-3 col-md-10 col-sm-10 col-10  ">
            <Slider {...settings}>
           

            {categories?.map((c)=>{
        return(
            <>
           
        
  <Link to={`/category/${c.slug}`}><button className='btn btn-dark me-2 category-btn'>{c.name}</button></Link>
       </>
        )
      })}
      </Slider>

      </div>
       

    </>
  )
}

export default HomepageCategory
