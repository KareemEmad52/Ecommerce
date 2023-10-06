import React, { useState } from 'react'
import style from './VirfyCode.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet";
import logo from "../../Assets/Images/favicon.ico";


export default function VirfyCode() {
  let navigate = useNavigate()
  let [isloading , setLoading] = useState(false)


  let validationSchema = Yup.object({
    resetCode: Yup.string().max(6,'code not valid').min(6,'code not valid').required('Email is Required')
  })

  async function SendCode(values){
    setLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
    .then(()=>{
      toast.success('Verified Successfully!');
      navigate('/updatepassword');
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
      resetCode : ''
    },
    validationSchema
    ,
    onSubmit:SendCode
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

      <label htmlFor="resetCode">ResetCode : </label>
      <input type="resetCode" id='resetCode' value={formik.values.resetCode} onBlur={formik.handleBlur} onChange={formik.handleChange} name='resetCode' className='form-control my-2' />
      {formik.errors.resetCode && formik.touched.resetCode ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.resetCode}</div> :'' }



      {isloading ? <button className='btn btn-success bg-main text-main  my-2'> <ThreeDots className="mt-5" height="24" width="35" radius="5" color="#fff" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} /> </button> :       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white my-2'>Verify code</button>}

    
    </form>
  </>
}
