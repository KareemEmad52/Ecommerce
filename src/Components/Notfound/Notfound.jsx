import React from 'react'
import style from './Notfound.module.css'
import notFound from '../../Assets/Images/error.svg'


export default function Notfound() {
  return <>

    <div className="d-flex  justify-content-center align-items-center">
      <img  src={notFound} alt="" />
    </div>

  </>
}
