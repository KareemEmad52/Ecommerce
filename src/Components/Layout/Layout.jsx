import React, { useContext, useEffect } from 'react'
import style from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { userToken } from '../userToken/userToken'
import { Offline, Online } from "react-detect-offline";

export default function Layout() {


  let {setUserToken} = useContext(userToken)

  useEffect(()=>{

    if(localStorage.getItem('userToken')  !== null){
        setUserToken(localStorage.getItem('userToken'))
    }
  },[])


  return <>
  

  <Navbar/>


    <div className="container layout">
    <Outlet/>
    </div>


    <div>
      <Offline><div className="network"><i className='fas fa-wifi'></i> You Are offline </div></Offline>
          
  </div>


  <Footer/>
  
  </>
}
