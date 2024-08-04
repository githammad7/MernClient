import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Price } from './Price'
import { useCart } from '../context/CartProvider'
import toast from 'react-hot-toast'
import HomepageCategory from './HomepageCategory'

const Homepage = () => {
  const [cart, setCart] = useCart()
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const [checked, setchecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()



  const getallProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false)

      setProduct(data.products)

    } catch (error) {
      setLoading(false)
      console.log(error)

    }
  }
  const Loadmore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProduct([...product, ...data?.products])
    } catch (error) {
      setLoading(false)
      console.log(error)

    }


  }
  useEffect(() => {
    if (page === 1) return;
    Loadmore();
  }, [page])

  const getallCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      setCategory(data.getcategory)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getallCategory()
  }, [])
  useEffect(() => {
    if (!checked.length || !radio.length) getallProducts()

  }, [checked.length, radio.length])
  const handleChecked = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    }
    else {
      all = all.filter(c => c !== id)
    }
    setchecked(all)
  }
  useEffect(() => {
    if (checked.length || radio.length) handleFilter()
  }, [checked, radio])
  const handleFilter = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`, { checked, radio })
      setProduct(data?.product)
    } catch (error) {
      console.log(error)

    }

  }
  const gettotlaProduct = async () => {
    try {
      const { data } = await axios(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    gettotlaProduct()
  }, [])
  return (
    <Layout title={"Ecommerce app"}>

      <div className="container-fluid ">
        <div className="row ms-5 ">
          
          <HomepageCategory />
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <hr />
          </div>
        </div>
        <div className="row mt-3">

          <div className="col-md-3 order-2 order-sm-2 mt-2">
            <h5 className='text-center mt-5'>ALL CATEGORIES</h5>
            <div className="d-flex flex-column ms-4  ">
              {category?.map((c) => {
                return (
                  <>
                    <Checkbox key={c._id} onChange={(e) => handleChecked(e.target.checked, c._id)}>
                      {c.name}

                    </Checkbox>
                  </>
                )
              })}
            </div>
            <h5 className='text-center'>FILTER BY PRICE</h5>
            <Radio.Group>
              <div className=" d-flex flex-column ms-4  ">

                {Price?.map((p) => {
                  return (
                    <div className="mt-2">
                      <Radio key={p.id} value={p.array} onChange={(e) => { setRadio(e.target.value, p._id) }}>{p.name}</Radio>
                    </div>
                  )
                })}
              </div>
            </Radio.Group>
            <div className="d-flex flex-column ms-4 mt-5">
              <button className='btn btn-dark mb-5' onClick={() => window.location.reload()}>Reset Filters</button>
            </div>


          </div>

          <div className="col-md-9 order--2  order-sm-0">

            <div className="d-flex flex-wrap ">
              {product?.map((p) => {
                return (
                  <>
                    <div className="card ms-3 mt-3" key={p._id} >
                      <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt="Card image cap" />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0, 30)}...</p>
                        <p className="card-text text-success"><b>Rs:{p.price}</b></p>

                        <button className="btn btn-dark me-4" onClick={() => { navigate(`/product/${p.slug}`) }}>More Details</button>
                        <button className="btn btn-primary" onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem("cart", JSON.stringify([...cart, p]))

                          toast.success("item added to cart")
                        }}>Add To Cart</button>


                      </div>
                    </div>
                  </>
                )
              })}
            </div>
            <div className='m-2 p-2'  >
              {product && product.length < total && (
                <button className='btn btn-dark' onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 1)
                }}>
                  {loading ? "Loading..." : "Load more"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Homepage
