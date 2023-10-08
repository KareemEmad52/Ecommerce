import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import Slider from "react-slick";
import axios from 'axios';
import { useQuery } from 'react-query';



export default function CategorySlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows:false,
  };



  function getAllCat(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories') 
  }

  let {data} = useQuery('allCategories',getAllCat);
  console.log();
  return <>

    

      <div className="py-3">
        <h2 className='h5 my-3  fw-medium'>Shop Popular Category </h2>
      <Slider {...settings}>
      {data?.data.data.map((item)=>(
          <img key={item._id} height={225} className='w-100' src={item.image} alt={item.title} />
          ))}
      </Slider>

      </div>

  
  </>
}
