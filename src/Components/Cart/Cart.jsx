import React, { useContext, useEffect } from 'react'
import style from './Cart.module.css'
import { cartContext } from '../CartContext/CartContext'
import { useState } from 'react';
import { Puff } from 'react-loader-spinner';
import { Helmet } from 'react-helmet'
import logo from "../../Assets/Images/favicon.ico";
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import cartImage from '../../Assets/Images/preview.png'


export default function Cart() {

  let [cartDeatails, setCartDetails] = useState(null)
  let [isLoading, setLoading] = useState(false)
  let { getUserCart, removeCartItem, updateCountProduct, setcartProductNum } = useContext(cartContext);


  async function RemoveItem(id) {
    setLoading(true)
    let { data } = await removeCartItem(id);
    setCartDetails(data)
    setcartProductNum(data?.numOfCartItems)
    setLoading(false)
  }

  async function updateCount(id, count) {
    let { data } = await updateCountProduct(id, count);
    setCartDetails(data);
  }

  async function getCartDetails() {
    setLoading(true)
    let { data } = await getUserCart();
    setCartDetails(data)
    setLoading(false)
  }




  useEffect(() => {
    getCartDetails()

  }, [])

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Shoping Cart</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <link rel="icon" href={logo} />
    </Helmet>

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

    </div> : <>{cartDeatails ? <div className='w-75 my-2 mx-auto p-3 bg-main-light'>
      <h2>Shoping Cart</h2>
      <h4 className='h6 text-main'>Cart Items : {cartDeatails.numOfCartItems}</h4>
      <h4 className='h6 text-main'>Total Cart Price  : {cartDeatails.data.totalCartPrice} EGP</h4>

      {cartDeatails.data.products.map((product) => (<div key={product.product.id} className='row border-bottom py-2 align-items-center'>

        <div className="col-md-2">
          <img className='w-100  img-thumbnail' src={product.product.imageCover} alt="" />
        </div>

        <div className="col-md-10 ">
          <div className="row justify-content-between align-items-center">

            <div className='col-md-10'>
              <h4 className='h5 '>{product.product.title}</h4>
              <h6 className='text-main'>{product.price}</h6>

              <button onClick={() => RemoveItem(product.product.id)} className='btn mx-0 p-0 my-2'><i className="fa-solid fa-trash text-danger"></i> Remove</button>
            </div>

            <div className='col-md-2'>
              <button onClick={() => updateCount(product.product.id, product.count + 1)} className='btn brdr-main'>+</button>
              <span className='mx-2 '>{product.count}</span>
              <button onClick={() => updateCount(product.product.id, product.count - 1)} className='btn brdr-main'>-</button>
            </div>


          </div>
        </div>




      </div>))}

      <Link to={'/paymentDetails'} className='btn w-100 bg-main text-white text-center my-2 '>Online Payment</Link>


    </div> : <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
      <img src={cartImage} alt="" />
    </div>}</>}
  </>
}
