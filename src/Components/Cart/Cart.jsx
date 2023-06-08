import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { cartContext } from '../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2'


export default function Cart() {

  let { getLoggedUserCart, removeItem, updateProductCount } = useContext(cartContext);
  let [cartDetails, setcartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  async function getCart() {
    setIsLoading(true);
    let response = await getLoggedUserCart()
    // console.log(response);
    if (response?.data?.status === 'success') {
      setcartDetails(response.data.data);
      setIsLoading(false);

    }
  }

  async function deleteItem(productId) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      let response = await removeItem(productId);
      console.log(response);
      setcartDetails(response.data.data);
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    }
  }

  async function updateProductQuantity(productId, count) {
    let response = await updateProductCount(productId, count);
    setcartDetails(response.data.data)
    toast('Product count update', { duration: 2000 });
    // console.log(response);
  }


  useEffect(() => {
    getCart();
  }, []);

  return <>
    <Helmet>
      <title>Cart Details</title>
    </Helmet>
    <div className="container pt-2 min-vh-100">
      {isLoading ? (<div className="center">
        <div className="circle"></div>
        <span>LOADING....</span>
      </div>) : cartDetails !== null &&
      (<div className=' bg-main-light m-4 p-4 bg-opacity-25 shadow mx-auto rounded-3 w-100  '>
        <h3>shop cart :</h3>
        <h6 className='text-main'>total cart price :{cartDetails.totalCartPrice} EGP</h6>

        {cartDetails.products.map((product) =>
          <div key={product.product._id} className="row border-bottom  my-3 align-items-center ">

            <div className="col-md-1">
              <img className='w-100' src={product.product.imageCover} alt="" />
            </div>

            <div className="col-md-11 d-flex justify-content-between">

              <div>
                <h6>{product.product.title}</h6>
                <h6 className="text-main">price : {product.price}</h6>
                <button onClick={() => deleteItem(product.product._id)}
                  className='btn btn-outline-success'>
                  <i className='fa-regular text-dark fa-trash-can'></i> Remove
                </button>
              </div>

              <div>
                <button onClick={() => updateProductQuantity(product.product._id, product.count + 1)}
                  className='btn border-main 
                    btn-sm'>+</button>
                <span className='mx-2'>{product.count}</span>
                <button onClick={() => updateProductQuantity(product.product._id, product.count - 1)}
                  className='btn border-danger'>-</button>
              </div>

            </div>
          </div>)}
        <button className='btn bg-main border-main w-100'>
          <Link className='text-white' to={'/CheckOut'} >
            CheckOut
          </Link>
        </button>
      </div>)}


    </div>

  </>
}
