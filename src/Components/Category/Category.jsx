import React from 'react'
import electronics from '../Category/images/electronics.webp'
import men from '../Category/images/men.webp'
import women from '../Category/images/women.webp'
import jewelery from '../Category/images/jewelery.jpg'
import CategoryCard from './CategoryCard'

const Category = () => {
  return (
    <div className='category-grid'>
      <CategoryCard
        title={"Electronics"}
        image={electronics}
        description={"Shop now"}
      /> 
        <CategoryCard
            title={"Men's closing"}
            image={men}
            description={"Shop now"}
          />
      
      <CategoryCard
        title={"women's clothing"}
        image={women}
        description={"Shop now"}
      />

      <CategoryCard
        title={"jewelery"}
        image={jewelery}
        description={"Shop now"}
      />
    </div>
  )
}

export default Category
