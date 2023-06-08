import React from 'react'
import { Helmet } from 'react-helmet';
import img1 from '../../assets/images/error.svg';


export default function NotFound() {


  return <>
    <Helmet>
      <title>Error 404 </title>
    </Helmet>
    <div className="text-center py-5">
      <img src={img1} alt="404" />
    </div>
  </>
}
