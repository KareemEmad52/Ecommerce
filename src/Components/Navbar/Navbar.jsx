import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import freshCartLogo from '../../Assets/Images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { userToken } from '../userToken/userToken'
import { cartContext } from '../CartContext/CartContext'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useSelector } from 'react-redux'




export default function Navbar() {

  let {deleteCart ,cartProductNum ,setcartProductNum} = useContext(cartContext)

  let headers = {
    token : localStorage.getItem('userToken')
  } 
  let navigate = useNavigate();
  let {usertoken , setUserToken} = useContext(userToken)

  async function clearCart(){
    let {data} = await deleteCart();
  }
  async function logout(){
        await clearCart()
        setcartProductNum('0')
        localStorage.removeItem('userToken')
        setUserToken(null)
        navigate('/login')
  }



  
  return <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to=""><img src={freshCartLogo} alt="" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">


          {usertoken ? <> <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>


        



        <li className="nav-item">
          <Link className="nav-link" to="products">Products</Link>
        </li>


        <li className="nav-item">
          <Link className="nav-link" to="categories">Categories</Link>
        </li>


        <li className="nav-item">
          <Link className="nav-link" to="brands">Brands</Link>
        </li>


        <li className="nav-item">
          <Link className="nav-link" to="wishlist">Wishlist</Link>
        </li>

        </> : ''}


        


       
        
      </ul>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">




      

      <li className="nav-item d-flex justify-content-center align-items-center ">
        <i className="fa-brands fa-instagram me-2 fs-6 "></i>
        <i className="fa-brands fa-facebook me-2 fs-6"></i>
        <i className="fa-brands fa-tiktok me-2 fs-6"></i>
        <i className="fa-brands fa-twitter me-2 fs-6"></i>
        <i className="fa-brands fa-linkedin me-2 fs-6"></i>
        <i className="fa-brands fa-youtube me-2 fs-6"></i>

      </li>

      

        {usertoken ? <> <li className="nav-item position-relative">
          <Link className="nav-link mx-0 px-1" to="cart"><i className="fa-solid fa-cart-shopping fs-4"></i>
          
          <div className='cartDiv text-center text-white'>{cartProductNum}</div>
          
          </Link>
        </li>
        

        <li className="nav-item">
          <span onClick={()=>{ logout() }} className="nav-link cursor-pointer" >Logout</span>
        </li> 
        
        </>   :  <> 
         <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>


        <li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li> </>}
        


       

      </ul>
      
    </div>
  </div>
</nav>

  </>
}
