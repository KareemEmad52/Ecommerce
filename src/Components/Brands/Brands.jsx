import React, { useEffect } from 'react'
import style from './Brands.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../Redux/BrandsReducer'
import { Puff } from 'react-loader-spinner'


export default function Brands() {

  let {brands , loading , isError} = useSelector((state)=> state.brands)
  let dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getBrands());
  },[])

  return <>

{loading ? <div className='vh-100 w-100 d-flex py-5 justify-content-center align-items-center'> 

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

 </div> : <div className='row gy-3 gx-3 my-2'>

      {brands.map((brand)=> <div className='col-md-3 cursor-pointer p-2'>
        <img  className='w-100 border rounded-5' src={brand.image} alt="" />
      </div>) }

  </div>}
  
  
  </>
}
