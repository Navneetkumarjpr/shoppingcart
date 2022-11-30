import React from 'react'
import './header.css'
import Search from "../images/search.png"
import User from "../images/user.png"
import Shopping from "../images/shopping.png"
const Header = () => {
  return (
    <div className='header'>
        <div className="logo">
           <h2>TEST</h2>
        </div>
        <div className="header_icons">
            <h5>Track Order</h5>
            <img className='header_image' src={Search} alt="" />
            <img className='header_image' src={User} alt="" />
            <img className='header_image' src={Shopping} alt="" />
        </div>
    </div>
  )
}

export default Header