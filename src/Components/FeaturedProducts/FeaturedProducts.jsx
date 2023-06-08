import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2'


export default function FeaturedProducts() {

  let baseurl = 'https://ecommerce.routemisr.com/'
  const { addToCart, setnumOfCartItems } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

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

  async function getProducts() {
    setIsLoading(true);
    let { data } = await axios.get(`${baseurl}api/v1/products`)
    setProducts(data.data);
    setIsLoading(false);

  }

  useEffect(() => {
    getProducts();
  }, [])




  return <>
    {isLoading ? <div className="center">
      <div className="circle"></div>
      <span>LOADING....</span>
    </div> : <div className="row my-4 pb-1">

      {products.map((product) => <div key={product._id} className="col-md-2 g-3">

        <div className="product cursor-pointer px-2 py-3 bg-light bg-opacity-25 shadow mx-auto rounded-4 ">
          <Link to={`/ProductDetails/${product._id}`}>

            <img className="w-100" src={product.imageCover} alt={product.title} />
            <span className="text-main fw-bold font-sm">{product.category?.name}</span>
            <h3 className="h6 fw-bolder">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
            <div className="d-flex justify-content-between">
              <span className="text-muted">{product.price} <span className="text-main">EGP</span> </span>
              <span>
                {product.ratingsAverage} <i className="fas fa-star rating-color"></i>
              </span>
            </div>

          </Link>
          <button onClick={() => addProduct(product._id)} className="btn bg-main text-white w-100">
            + Add
          </button>

        </div>
      </div>)}
    </div >}
  </>
}
