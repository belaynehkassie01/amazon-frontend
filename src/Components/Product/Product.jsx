import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'
import classes from './Product.module.css'
import Loader from '../Loader/Loader'

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data)
        isLoading(false)
      }).catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    
    <>
      {
        isLoading?(<Loader/>):(<section className={classes.products_container}>
      {
        products?.map((singleProduct) => {
          return <ProductCard
            key={singleProduct.id}
            product={singleProduct}
            renderAdd={true}
          />
      })
      }
    </section>)
      }
      
    </>
  )
}

export default Product

