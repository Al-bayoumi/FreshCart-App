import React from 'react'
import CategorySlider from '../CategorySlider/CategorySlider';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from "react-helmet";

export default function Home() {


  return <>
    <Helmet>
      <title>FreshCart</title>
    </Helmet>
    <MainSlider />
    <CategorySlider />
    <FeaturedProducts />
  </>


}
