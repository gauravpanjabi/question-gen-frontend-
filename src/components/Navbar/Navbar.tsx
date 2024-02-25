import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

import logo from  '../../assets/images/Smartmcq.png'

const Navbar = () => {
  return (
    <div>
      <div className='header'>
             
        <div className='logo-container'>
            <img src={logo} alt='' className='logo-img'></img>
        </div>

        <div className='button-stack'>
          <button className='login-button'>Log in</button>
          <Link to="/mcq"><button className='signup-button'>Sign up</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;