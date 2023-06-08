import React from 'react'
import img1 from '../../assets/images/slider-image-3.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-1.jpeg'
import Slider from "react-slick";

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };


  return <>
    <div className="row g-0 my-3 pt-3">
      <div className="col-md-9">
        <Slider {...settings} autoplaySpeed={3000}>
          <img className='w-100' height={400} src={img1} alt="" />
          <img className='w-100' height={400} src={img2} alt="" />
          <img className='w-100' height={400} src={img3} alt="" />
        </Slider >
      </div>
      <div className="col-md-3">
        <img className='w-100' height={200} src={img2} alt="" />
        <img className='w-100' height={200} src={img3} alt="" />
      </div>
    </div>

  </>
}
