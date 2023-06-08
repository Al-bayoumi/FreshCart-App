import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function CategoryDetails() {


  let baseurl = 'https://ecommerce.routemisr.com/';
  const { addToCart, setnumOfCartItems } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState(null);
  let { id } = useParams()

  // ****************** addProduct *******************************

  async function addProduct(productId) {
    const response = await addToCart(productId);
    if (response?.data?.status === 'success') {
      setnumOfCartItems(response.data.numOfCartItems);
      toast.success(response.data.message, { duration: 2000 });
    } else {
      toast.error('Error', { duration: 2000 });
    }
    console.log(response);

  }

  // ****************** getCategoryProduct *******************************

  async function getCategoryProduct() {
    setIsLoading(true);
    try {
      let { data } = await axios.get(`${baseurl}api/v1/categories`, {
        params: { 'Categories': id }
      });
      setProducts(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error : ', error);
    }
  }
  // ********* useEffect *************
  useEffect(() => {
    getCategoryProduct();
  }, [])

  // *********************************

  return (<>

    <Helmet>
      <title>Category Details</title>
    </Helmet>
    <div className="container min-vh-100 pt-5">
      <h1 className='h5 text-danger text-center'>Category Details</h1>
      <h3 className='h5 text-danger text-center'>Not Found</h3>
    </div>
  </>)
}
