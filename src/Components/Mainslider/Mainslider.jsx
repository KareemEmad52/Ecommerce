import React from 'react'
import style from './Mainslider.module.css'
import Slider from "react-slick";
import banner1 from '../../Assets/Images/photo-camera-balancing-with-yellow-background.jpg'
import banner2 from '../../Assets/Images/delicious-burger-with-many-ingredients-isolated-white-background-tasty-cheeseburger-splash-sauce.jpg'
import slide1 from '../../Assets/Images/slider-image-1.jpeg'
import slide2 from '../../Assets/Images/slider-image-2.jpeg'
import slide3 from '../../Assets/Images/slider-image-3.jpeg'
export default function Mainslider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay: true,
      autoplaySpeed: 3000,
  };


  return <>
  
  <div className="py-3">
      <div className="row gx-0">
        <div className="col-md-9">
        <Slider {...settings}>
            <img height={400} src={slide1} alt="" />
            <img height={400} src={slide2} alt="" />
            <img height={400} src={slide3} alt="" />
          </Slider>
        </div>

        <div className="col-md-3">
          <img height={200} className='w-100' src={banner1} alt="" />
          <img height={200} className='w-100' src={banner2} alt="" />
        </div>

      </div>

      </div>
  
  </>
}
