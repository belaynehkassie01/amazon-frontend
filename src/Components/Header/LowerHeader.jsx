import React, { useState } from 'react'
import classes from './Header.module.css'
import { IoMenuSharp } from "react-icons/io5";
import { CgClose } from "react-icons/cg";

function LowerHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuItems = [
    "Today's Deals",
    "Customer Service", 
    "Registry",
    "Gift Cards",
    "Sell"
  ];

  return (
    <>
      <div className={classes.lower_container}>
        <ul>
          <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <IoMenuSharp />
            <p>All</p>
          </li>
          {menuItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={classes.mobile_menu_overlay}>
          <div className={classes.mobile_menu}>
            <div className={classes.mobile_menu_header}>
              <h3>Menu</h3>
              <button onClick={() => setIsMenuOpen(false)}>
                <CgClose size={24} />
              </button>
            </div>
            <ul>
              <li>All</li>
              {menuItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default LowerHeader