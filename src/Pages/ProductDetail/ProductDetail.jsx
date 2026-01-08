import React, { useEffect, useState } from 'react'
import classes from './ProductDetail.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/EndPoints'
import Loader from '../../Components/Loader/Loader'
import ProductCard from '../../Components/Product/ProductCard'
function ProductDetail() {
  const [isLoading, setIsLoading] = useState(false)
  const { productId } = useParams();
  const [product, setProduct] = useState({})
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`).then((res) => {
      setProduct(res.data);
      setIsLoading(false)
    }).catch((err) => {
      console.log(err);
      setIsLoading(false)
    })
  },[])
  return (
    <LayOut>
      {isLoading? (<Loader/>):(<ProductCard
        product={product}
        flex={true}
        renderDesc={true}
        renderAdd={true}
      />)}
      
    </LayOut>
  )
}

export default ProductDetail
