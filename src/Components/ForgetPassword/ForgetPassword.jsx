import React, { useState } from 'react'
import style from './ForgetPassword.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet";
import logo from "../../Assets/Images/favicon.ico";


export default function ForgetPassword() {


  let navigate = useNavigate()
  let [isloading , setLoading] = useState(false)


  let validationSchema = Yup.object({
    email: Yup.string().email('email is invaild').required('Email is Required')
  })

  async function SendEmail(values){
    setLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
    .then(()=>{
      toast.success('Code Sent Successfully!');
      navigate('/virfiyCode');
      setLoading(false)
    }).catch((err)=>{
      toast.error('This is an error!');
      document.getElementById('Emailerror').classList.replace('d-none','d-block');
      document.getElementById('Emailerror').innerHTML = err.response.data.message
      setLoading(false)
    })
    setLoading(false)
  }

  let formik = useFormik({
    initialValues:{
      email : ''
    },
    validationSchema
    ,
    onSubmit:SendEmail
  })
  return <>


<Helmet>
                <meta charSet="utf-8" />
                <title>ForgetPassword</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="icon" href={logo} />
            </Helmet>


    <form onSubmit={formik.handleSubmit} className='w-75 mx-auto mt-5 pt-5'>

      <div id='Emailerror' className=' alert alert-danger d-none'></div>

      <label htmlFor="email">Email : </label>
      <input type="email" id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' className='form-control my-2' />
      {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.email}</div> :'' }



      {isloading ? <button className='btn btn-success bg-main text-main  my-2'> <ThreeDots className="mt-5" height="24" width="35" radius="5" color="#fff" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} /> </button> :       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white my-2'>Send code</button>}

    
    </form>
  </>
}
