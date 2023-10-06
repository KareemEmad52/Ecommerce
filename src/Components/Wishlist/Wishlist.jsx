import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { wishlistContext } from '../WishlistContext/WishlistContext'
import { Puff } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import logo from "../../Assets/Images/favicon.ico";
import { cartContext } from '../CartContext/CartContext'
import toast from 'react-hot-toast'


export default function Wishlist() {


  let {addToCart ,setcartProductNum} = useContext(cartContext);
  let {getWishlist ,removeFromWishlist} =useContext(wishlistContext)
  let [wishlistDetails ,setWishlistDetails] = useState();
  let [isLoading ,setIsLoading] = useState(false)

  async function getWishlistDetails(){
    setIsLoading(true);
    let {data} =  await getWishlist();
    if (data.status == 'success'){
      setIsLoading(false);
      setWishlistDetails(data);
      console.log(data);
    } else {
      setIsLoading(false);
    }
  }

  async function addProductToCart(id){
    let {data}  = await addToCart(id);
    if(data?.status === 'success'){
      toast.success('Product Add Successfully',{
        duration: 3000,
        position: 'top-right',

        style :{
          border :' 2px solid #61d345'
        },
      })

      setcartProductNum(data?.numOfCartItems)
    } else {
      console.log('error');
      toast.error('Failed to add product',{
        duration: 3000,
        position: 'top-right',

        style :{
          border :' 2px solid #ff4b4b'
        },})
    }
}

  async function RemoveProductFromWishlist(id){
    setIsLoading(true);
    let {data} = await removeFromWishlist(id);
    console.log(data);
    getWishlistDetails()
  }

  useEffect(()=>{
    getWishlistDetails()
  },[])

  return <>

<Helmet>
                <meta charSet="utf-8" />
                <title>WishList</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="icon" href={logo} />
            </Helmet>
  
  
  
  {isLoading ?<div className='vh-100 w-100 d-flex py-5 justify-content-center align-items-center'> 

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
  
   </div>  :  <div className='w-75 my-2 mx-auto p-3 bg-main-light'>
  <h2>Wishlist : </h2>
  <h4 className='h6 text-main'>Cart Items : {wishlistDetails?.count}</h4>

  {wishlistDetails?.data.map((item)=> <div key={item.id} className='row border-bottom py-2 align-items-center'>

  <div className="col-md-2 d-flex justify-content-center">
      <img height={150} className='' src={item.imageCover} alt="" />
    </div>



    <div className="col-md-10 ">
          <div className="row justify-content-between align-items-center">

              <div className='col-md-9'>
                <h4 className='h5 '>{item.title}</h4>
                <h6 className='text-main'>Price : {item.price}</h6>
                <h6 className='text-main'>ratingsAverage : {item.ratingsAverage} </h6>

                <button onClick={()=> RemoveProductFromWishlist(item.id)} className='btn btn-outline-danger btn-sm'><i className="fa-solid fa-trash-can"></i> Remove</button>
              </div>

              <div className='col-md-3 text-center'>
                  <button onClick={()=> addProductToCart(item.id)} className='btn bg-main text-white '>Add to cart</button>
              </div>


          </div>
    </div>


  </div> )}
</div>  }


        </>
}
