import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Brands() {

  let baseurl = 'https://ecommerce.routemisr.com/'
  let [isLoading, setIsLoading] = useState(false);
  let [brands, setBrands] = useState([])

  async function getBrands() {
    setIsLoading(true);
    let { data } = await axios.get(`${baseurl}api/v1/brands`)
    setBrands(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getBrands();
  }, [])


  return <>
    <Helmet>
      <title>Brands</title>
    </Helmet>

    {isLoading ? <div className="center">
      <div className="circle"></div>
      <span>LOADING....</span>
    </div> : <div className="row  py-4 pb-1">

      <div className="col-md-4 align-items-center d-flex">
        <div>
          <div className="brdr w-75 mb-3"></div>
          <h2 className='h3 text-main fw-bold'>Our Brands</h2>
          <p className='text-muted'>You can see our brands and each brand includes the products in it</p>
          <div className="brdr w-100 mt-4"></div>
        </div>
      </div>

      {brands.map((product) => <div key={product._id} className="col-md-2 mt-5">
        <Link to={`/prandDetails/${product._id}`}>
          <div className='product cursor-pointer px-2 py-3 bg-light bg-opacity-25 shadow mx-auto rounded-4 '>
            <img src={product.image} className='w-100' alt={product.name} />
            <h4 className='text-center text-main ' >{product.name}</h4>
          </div>
        </Link>
      </div>)}

    </div>}

  </>

}