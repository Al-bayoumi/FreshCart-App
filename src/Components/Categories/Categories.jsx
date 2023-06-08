import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Categories() {

  let baseurl = 'https://ecommerce.routemisr.com/'
  let [isLoading, setIsLoading] = useState(false);
  let [categories, setCategories] = useState([])


  //*************** getCategories ****************
  async function getCategories() {
    setIsLoading(true);
    let { data } = await axios.get(`${baseurl}api/v1/categories`)
    setCategories(data.data);
    setIsLoading(false);
  }
  //*************** useEffect ****************
  useEffect(() => {
    getCategories();
  }, [])

  // ***************************************
  return <>
    <Helmet>
      <title>categories</title>
    </Helmet>

    {isLoading ? <div className="center">
      <div className="circle"></div>
      <span>LOADING....</span>
    </div> : <div className="row ">

      <div className="col-md-5 align-items-center d-flex">
        <div>
          <div className="brdr w-75 mb-3"></div>
          <h2 className='h3 text-main fw-bold'>Our categories</h2>
          <p className='text-muted'>You can see our categories and each category includes the products in it</p>
          <div className="brdr w-100 mt-4"></div>
        </div>
      </div>

      {categories.map((category) => <div key={category._id} className="col-md-3 mt-5 g-3">
        <Link to={`/categoryDetails/${category._id}`}>
          <div className='product cursor-pointer px-2 py-3 bg-light bg-opacity-25 shadow mx-auto rounded-4 '>
            <img className="w-100" height={500} src={category.image} alt={category.title} />
            <h2 className='h6 pt-2'>{category.name}</h2>
          </div>
        </Link>
      </div>)}

    </div>}



  </>
}
