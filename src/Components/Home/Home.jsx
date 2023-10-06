import React, { useContext } from 'react'
import style from './Home.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../Mainslider/Mainslider'
import { Helmet } from 'react-helmet'
import logo from "../../Assets/Images/favicon.ico";


export default function Home() {


  return <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>FreshCart Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="icon" href={logo} />
            </Helmet>

    <MainSlider/>

    <CategorySlider/>
    
    <FeaturedProducts/>

    </>
}
