import React, { useContext } from 'react'
import style from './PaymentDetails.module.css'
import { useFormik } from 'formik'
import { cartContext } from '../CartContext/CartContext'


export default function PaymentDetails() {

  let {onlinePayment ,cartId} = useContext(cartContext)
  async function handleDetailsSubmit(values){
    let {data} = await onlinePayment(cartId ,values);
    window.location.href = data?.session.url
  }
  
  let formik = useFormik({
    initialValues: {
      details : '',
      phone : '',
      city : ''
    },

    onSubmit:handleDetailsSubmit,
  })

  return <>
  <h3 className='my-3'>Payment Details : </h3>
  
  <form onSubmit={formik.handleSubmit}>

    <label className='m-1' htmlFor="details">Details</label>
    <input className='form-control m-1' id='details' name='details' type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} />


    <label className='m-1' htmlFor="phone">Phone</label>
    <input className='form-control m-1' id='phone' name='phone' type="tel" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />


    <label className='m-1' htmlFor="city">City</label>
    <input className='form-control m-1' id='city' name='city' type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />


    <button type='submit' className='btn w-100 m-2 my-3 text-center text-white bg-main'>Pay Now</button>


  </form>
  
  
  
  </>
}
