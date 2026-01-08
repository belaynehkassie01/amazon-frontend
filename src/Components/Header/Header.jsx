import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import LowerHeader from './LowerHeader';
import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { FiShoppingCart } from "react-icons/fi";
import classes from './Header.module.css'
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';
function Header() {
  const [{user, basket }, dispatch] = useContext(DataContext)
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount
  },0)
  return (
      <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
                      {/* logo */}
            <div className={classes.logo_container}>
                <Link to="/">
                    <img src="https://pngimg.com/uploads/amazon/small/amazon_PNG25.png" alt="amazon logo"/>
            </Link>
            <div className={classes.delivery}> 
            <span>
                {/* icon */}
                <SlLocationPin />
            </span>
            <div >
              <p>Deliver to</p>
              <span>Ethiopia</span>
              </div>
              </div>
          </div>
            {/* search */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder='Search product' />
            < FaSearch size={25}/>
            {/* icon */}
          </div>
          {/* right side */}
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img src="https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg" alt="" />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            {/* three components */}
            <Link to={!user &&"/auth"}>
              <div className={classes.sign}>
               
                  {
                  user ? (
                    <>
                      <p>Hello,{user?.email?.split("@")[0]}</p>
                      <small onClick={()=>auth.signOut()}>Sign Out</small>
                    </>
                  ) : (
                      <>
                        <p>Hello,Sign In</p>
                       <span>Account & Lists</span>

                      </>
                    )}
              </div>
            </Link>
            {/* order */}
            <Link to="/orders" className={classes.return} >
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <FiShoppingCart size={35}/>
              {/* icon */}
              <span>{totalItem}</span>
              </Link>
          </div>
          </div>
      </section>
      <LowerHeader />
      </section>
    
  )
}

export default Header
