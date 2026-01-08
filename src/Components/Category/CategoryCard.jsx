import React from 'react'
import './Category.css';
import { Link } from 'react-router-dom';
const  CategoryCard = (props) => {
  return (
    <div className='product-box'>
      <Link to={`/category/${props.title}`} className='title'>
        <span> { props.title}</span>
      </Link>
      <Link to={`/category/${props.title}`} className='image'>
        <img src={props.image} alt="" />
      </Link>
      <Link to={`/category/${props.title}`} className='para'>
        <p > { props.description}</p>
      </Link>
    </div>
  )
}

export default CategoryCard;
