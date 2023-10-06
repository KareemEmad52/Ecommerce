import React, { useState } from 'react'
import style from './UpdatePassword.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet";
import logo from "../../Assets/Images/favicon.ico";


export default function UpdatePassword() {
  let navigate = useNavigate()
  let [isloading , setLoading] = useState(false)


  let validationSchema = Yup.object({
    email: Yup.string().email().required('Email is Required'),
    newPassword: Yup.string().matches(/^[A-z][A-Za-z0-9]{7,}/,'Must start with uppercase and more than 8 digits').required('Password is Required'),
  })

  async function UpdateEmail(values){
    setLoading(true)
    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
    .then(()=>{
      toast.success('Updated Successfully!');
      navigate('/login');
      setLoading(false)
    }).catch((err)=>{
      toast.error('This is an error!');
      document.getElementById('Emailerror').classList.replace('d-none','d-block');
      document.getElementById('Emailerror').innerHTML = err.response.data.message
      setLoading(false)
    })
    console.log(values);
    setLoading(false)
  }

  let formik = useFormik({
    initialValues:{
      email : '',
      newPassword: ''
    },
    validationSchema
    ,
    onSubmit:UpdateEmail
  })
  return <>


            <Helmet>
                <meta charSet="utf-8" />
                <title>VerifiyCode</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="icon" href={logo} />
            </Helmet>


    <form onSubmit={formik.handleSubmit} className='w-75 mx-auto mt-5 pt-5'>

      <div id='Emailerror' className=' alert alert-danger d-none'></div>

      <label htmlFor="email">Email : </label>
      <input type="email" id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' className='form-control my-2' />
      {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.email}</div> :'' }


      <label htmlFor="newPassword">NewPassword : </label>
      <input type="password" id='newPassword' value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} name='newPassword' className='form-control my-2' />
      {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.newPassword}</div> :'' }




      {isloading ? <button className='btn btn-success bg-main text-main  my-2'> <ThreeDots className="mt-5" height="24" width="35" radius="5" color="#fff" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} /> </button> :       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white my-2'>Update Email</button>}

    
    </form>
  </>
}
