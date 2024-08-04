import React from 'react'
import { useSearch } from '../context/SearchProvider'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const Search = () => {
    const[search,setSearch]=useSearch()
    const navigate=useNavigate()
    const handleSearch=async(e)=>{
        e.preventDefault()
        try {
          const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${search.keyword}`)
          setSearch({...search,result:data})
          navigate('/search')
        } catch (error) {
          console.log(error)
        }
      }
      
  return (
    <div >
      <form className="d-flex" onSubmit={handleSearch}>
  <input className="form-control form-control-sm me-2 mt-1"  type="search" placeholder="Search" aria-label="Search" 
  value={search.keyword}
  onChange={(e)=>{setSearch({...search,keyword:e.target.value})}}/>
  <button className="btn btn-dark mt-1 " type="submit">Search</button>
</form>

    </div>
  )
}

export default Search
