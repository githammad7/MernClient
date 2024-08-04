import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useCategory = () => {
    const[categories,setCategories]=useState([])
    const getCategories=async()=>{
        try {
            const{data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            setCategories(data?.getcategory)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCategories()
    },[])
 return categories;
}

export default useCategory
