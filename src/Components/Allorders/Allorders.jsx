import React, { useEffect, useState } from 'react'
import style from './Allorders.module.css'
import jwtDecode from 'jwt-decode'
import successeIcon from '../../Assets/Images/success-filled-custom.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Puff } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import logo from "../../Assets/Images/favicon.ico";

export default function Allorders() {

  let [isLoading, setIsloading] = useState(false)
  let encodedToken = localStorage.getItem('userToken')
  let decodeToken = jwtDecode(encodedToken).id;
  let [orders, setOreders] = useState()
  let navigate = useNavigate()
  function BackToHome() {
    navigate('/')
  }

  function getOrderDetails(id) {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((reponse) => reponse)
      .catch((error) => error)

  }

  async function getOrders(id) {
    setIsloading(true)
    let { data } = await getOrderDetails(id)
    setOreders(data.pop());
    setIsloading(false)
  }


  useEffect(() => {
    getOrders(decodeToken)
  }, [])


  return <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Orders</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <link rel="icon" href={logo} />
    </Helmet>

    <h2 className='text-center mt-3 fw-bolder  pt-3'>Thanks for Order</h2>
    <h4 className='text-center   border-bottom py-3'> <img width={27} className='mx-3' src={successeIcon} alt="" />Payment completed successfully</h4>




    {isLoading ? <div className='vh-100 w-100 d-flex py-5 justify-content-center align-items-center'>

      <Puff
        height="80"
        width="80"
        radius={1}
        color="#4fa94d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />

    </div> : <>
      <div className='alert alert-success fw-medium fs-5  w-75 mx-auto'>Total Order Price : {orders?.totalOrderPrice} EGP</div>

      <div className="w-75 mx-auto bg-main-light p-3 my-3">
        <h5 className='h6 py-3 m-0 px-0'>what you order : </h5>

        {orders?.cartItems.map((items) => <div key={items._id}>
          <div className='row py-2 border-bottom'>
            <div className="col-md-2 text-center">
              <img height={120} src={items.product.imageCover} alt="" />
            </div>
            <div className="col-md-10">
              <h4>{items.product.title.split(' ').slice(0, 3).join(' ')}</h4>
              <h4 className='h5'>Price : {items.price}</h4>
              <h4 className='h6'>Quantity : {items.count}</h4>
            </div>
          </div>

        </div>)}


        <button onClick={() => BackToHome()} className='btn bg-main text-white w-100 my-2'>Back to Home</button>
      </div>

    </>


    }



  </>
}
