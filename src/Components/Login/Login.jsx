import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { InfinitySpin, ThreeDots } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import {  userToken } from '../userToken/userToken'
import { Helmet } from 'react-helmet'
import logo from "../../Assets/Images/favicon.ico";


export default function Login() {
  

  let {setUserToken} = useContext(userToken)
  let navigate = useNavigate();
  let [isloading , setLoading] = useState(false)
  let [errors,setErrors] = useState(null)    
  
  let validateSchema = Yup.object({
    email: Yup.string().email('email is invaild').required('Email is Required'),
    password: Yup.string().matches(/^[A-z][A-Za-z0-9]{7,}/,'Must start with uppercase and more than 8 digits').required('Password is Required'),
  })

  async function sendData(values){
    setLoading(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
    .catch((err)=>{
      setErrors(err.response.data.message)
      setLoading(false);
    })

    if(data.message === "success"){
      setLoading(false)
      navigate('/')
      localStorage.setItem('userToken',data.token);
      setUserToken(data.token);
      console.log(data.token);
    }
    
    
  }

  let formik = useFormik({
    initialValues:{
      email : '',
      password : '',
    } ,

    validationSchema:validateSchema,
    onSubmit:sendData,
  })


  return <>

              <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="icon" href={logo} />
            </Helmet>

  
  <div className="w-50 mx-auto py-5">

    {errors ? <div className='alert alert-danger'>{errors}</div> : ''}


    <h2>Login Now : </h2>

    <form onSubmit={formik.handleSubmit}>

     

        <label htmlFor="userEmail">email : </label>
        <input id='userEmail' type="email" className='form-control mb-2' value={formik.values.emailmail} onBlur={formik.handleBlur}  onChange={formik.handleChange} name='email' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.email}</div> :'' }



        <label htmlFor="userPassword">password : </label>
        <input id='userPassword' type="password" className='form-control mb-3' value={formik.values.password} onBlur={formik.handleBlur}  onChange={formik.handleChange} name='password' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.password}</div> :'' }



        <div className="d-flex justify-content-between align-items-center w-100">
        {isloading ? <button className='btn btn-success bg-main text-main  mb-2'> <ThreeDots className="mt-5" height="24" width="35" radius="5" color="#fff" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} /> </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success text-white  bg-main text-main mb-2'>Login</button> }
        
        <div><Link to={'/forgetPassword'} className='text-main'> Forget Password...</Link></div>

        </div>        


        

        
    </form>


  </div>
  
  
  
  
  
  
  </>
}
