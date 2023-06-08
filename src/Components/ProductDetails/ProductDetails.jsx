import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useContext } from 'react'
import { cartContext } from '../Context/CartContext';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2'


export default function ProductDetails() {

  let baseurl = 'https://ecommerce.routemisr.com/'
  const { addToCart, setnumOfCartItems } = useContext(cartContext);
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cat, setCat] = useState({})
  let { id } = useParams()


  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === 'success') {
      setnumOfCartItems(response.data.numOfCartItems);
      Swal.fire({
        title: 'Product Added!',
        text: 'The product has been added to your cart.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      toast.error("Error", { duration: 2000 });
    }
    console.log(response);
  }


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false
  };

  async function getProductDetails() {
    setIsLoading(true);
    let { data } = await axios.get(`${baseurl}api/v1/products/${id}`)
    setProductDetails(data.data);
    setCat(data.data.category)
    setIsLoading(false);
  }


  useEffect(() => {
    getProductDetails();
  }, [])

  return <>
    <Helmet>
      <title>product Details</title>
    </Helmet>

    {isLoading ? <div className="center">
      <div className="circle"></div>
      <span>LOADING....</span>
    </div> : <div className="row align-items-center py-3 pt-4">

      <div className="col-md-3 bg-light bg-opacity-25 shadow mx-auto  rounded-2 g-3">
        {/* <div className="product cursor-pointer px-2 py-3 bg-light bg-opacity-25 shadow mx-auto rounded-4 "> */}
        <Slider {...settings} autoplay autoplaySpeed={3000}>
          {productDetails?.images.map((ele, index) => <img key={index} className='w-100'
            alt={productDetails.title} src={ele} />)}
        </Slider >
        {/* </div> */}
      </div>

      <div className="col-md-8">
        <h3>{productDetails?.title}</h3>
        <p className='text-muted p-2'>{productDetails?.description}</p>
        <span className='me-auto'>{cat.name}</span>
        <div className="d-flex justify-content-between">
          <span className="text-muted">{productDetails?.price} <span className="text-main">EGP</span> </span>
          <span>
            {productDetails?.ratingsAverage} <i className="fas fa-star rating-color"></i>
          </span>
        </div>
        <button onClick={() => addProduct(id)} className="btn bg-main text-white w-100">+ Add</button>
      </div>
    </div>}

  </>
}