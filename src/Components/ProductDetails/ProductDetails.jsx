import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Puff } from 'react-loader-spinner'
import Slider from "react-slick";
import { cartContext } from '../CartContext/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import logo from "../../Assets/Images/favicon.ico";

export default function ProductDetails() {

  let {addToCart ,setcartProductNum} = useContext(cartContext);

  async function addProductToCart(id){
    let {data}  = await addToCart(id);
    if(data?.status === 'success'){
      toast.success('Product Add Successfully',{
        duration: 3000,
        position: 'top-center',

        style :{
          border :' 2px solid #61d345'
        },
      })

      setcartProductNum(data?.numOfCartItems)
    } else {
      console.log('error');
      toast.error('Failed to add product',{
        duration: 3000,
        position: 'top-center',

        style :{
          border :' 2px solid #ff4b4b'
        },})
    }
}

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let {id} = useParams()

  let [productdetails,setProductDetails] = useState(null)
  let [isLoding,setIsLoding] = useState(false)
  async function getSpecificProduct(id){
    setIsLoding(true)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setProductDetails(data)
    setIsLoding(false)
  }


  useEffect(()=>{
    getSpecificProduct(id)
  },[])

  return <>

            

        {isLoding ? <div className=' vh-100 w-100 d-flex py-5 justify-content-center align-items-center'> 

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

 </div> : <div className="row align-items-center">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{productdetails?.data.title.split(' ').slice(0,2).join(' ')}</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="icon" href={logo} />
            </Helmet>

      <div className="col-md-4 p-5">
      <Slider {...settings}>
          {productdetails?.data.images.map((imgSrc)=>( 
              <img key={productdetails?.data.id} src={imgSrc} alt="" />
          ))}
        </Slider>
      </div>


      <div className="col-md-8">
        <h4>{productdetails?.data.title}</h4>
        <p className='h6 mb-2'>{productdetails?.data.description}</p>
        <span>{productdetails?.data.category.name}</span>

        <div className=' d-flex justify-content-between mt-2'>
          <p>{productdetails?.data.price} EGP</p>
          <div >
            <i className='fas fa-star rating-color'></i>
            <span>{productdetails?.data.ratingsAverage}</span>
          </div>
        </div>


        <button onClick={()=> addProductToCart(productdetails?.data.id)} className='btn w-100 bg-main text-white'>Add To Cart</button>

      </div>
    </div> }

    







  </>
}
