import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Slider from "react-slick";
import axios from 'axios';


export default function CategorySlider() {

  let baseurl = 'https://ecommerce.routemisr.com/';
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(`${baseurl}api/v1/categories`)
    setCategories(data.data);
  }


  useEffect(() => {
    getCategories();
  }, [])


  var settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    autoplay:true,
    arrows:false
  };
  return <>
    <h4 className="my-2  ">Shop Popular Categories</h4>
    <Slider {...settings} autoplaySpeed={3000}>
      {categories.map((category) => <div key={category._id}>
        <img className="w-100" height={200} src={category.image} />
        <h2 className='h6 pt-2'>{category.name}</h2>
      </div>)}
    </Slider >
  </>
}
