import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { InfinitySpin, RotatingLines, ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import logo from "../../Assets/Images/favicon.ico";



export default function Register() {


  let navigate = useNavigate();
  let [isloading , setLoading] = useState(false)
  const phoneRegex = /^01[0125][0-9]{8}$/
  let [errors,setErrors] = useState(null)    
  
  let validateSchema = Yup.object({
    name: Yup.string().min(3,'min Length is 3 ').max(20,'max Length is 20 ').required('Name is Required'),
    email: Yup.string().email('email is invaild').required('Email is Required'),
    phone: Yup.string().matches(phoneRegex, 'invalid phone number').required('Phone is Required'),
    password: Yup.string().matches(/^[A-z][A-Za-z0-9]{7,}/,'Must start with uppercase and more than 8 digits').required('Password is Required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')],'Password is not match').required('rePassword is Required')
  })

  async function sendData(values){
    setLoading(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
    .catch((err)=>{
      setErrors(err.response.data.message)
      setLoading(false);
    })

    if(data.message === "success"){
      setLoading(false)
      navigate('/login')
  
    }
    
    
  }

  let formik = useFormik({
    initialValues:{
      name : '',
      email : '',
      password : '',
      rePassword : '',
      phone : '',
    } ,

    validationSchema:validateSchema,
    onSubmit:sendData,
  })


  return <>

<Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="icon" href={logo} />
            </Helmet>
  
  <div className="w-50 mx-auto py-4">

    {errors ? <div className='alert alert-danger'>{errors}</div> : ''}


    <h2>Register Now : </h2>

    <form onSubmit={formik.handleSubmit}>

        <label htmlFor="userName">name : </label>
        <input id='userName' type="text" className='form-control mb-2' value={formik.values.name} onBlur={formik.handleBlur}  onChange={formik.handleChange} name='name' />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.name}</div> :'' }
        

        <label htmlFor="userEmail">email : </label>
        <input id='userEmail' type="email" className='form-control mb-2' value={formik.values.emailmail} onBlur={formik.handleBlur}  onChange={formik.handleChange} name='email' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.email}</div> :'' }



        <label htmlFor="userPassword">password : </label>
        <input id='userPassword' type="password" className='form-control mb-2' value={formik.values.password} onBlur={formik.handleBlur}  onChange={formik.handleChange} name='password' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.password}</div> :'' }



        <label htmlFor="userRePassword">rePassword : </label>
        <input id='userRePassword' type="password" className='form-control mb-2' value={formik.values.rePassword} onBlur={formik.handleBlur}  onChange={formik.handleChange} name='rePassword' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.rePassword}</div> :'' }


        <label htmlFor="userPhone">phone : </label>
        <input id='userPhone' type="tel" className='form-control mb-3' value={formik.values.phone} onBlur={formik.handleBlur}  onChange={formik.handleChange} name='phone' />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.phone}</div> :'' }



        {isloading ? <button className='btn btn-success bg-main text-main  mb-2'> <ThreeDots className="mt-5" height="24" width="35" radius="12" color="#fff" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} /> </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success text-white  bg-main text-main mb-2'>Register</button> }
        


        

        
    </form>


  </div>
  
  
  
  
  
  
  </>
}
