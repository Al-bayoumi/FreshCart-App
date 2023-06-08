import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import { cartContext } from '../Context/CartContext';
import { Helmet } from "react-helmet";

export default function CheckOut() {
  let { onlinePayment, cartId } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values) {
    setIsLoading(true);
    let response = await onlinePayment(cartId, values)
    if (response?.data?.status === 'success') {
      console.log(response);
      console.log(response.data.session.url);
      window.location.href = response.data.session.url;
      setIsLoading(false);
    }
  }


  let formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: ''
    },
    onSubmit: handleSubmit
  });

  return <>
    <Helmet>
      <title>CheckOut</title>
    </Helmet>


    <div className="container mx-auto pt-5">
      <div className="row  d-flex justify-content-center align-items-center pb-lg-5 ">
        <div className='col-md-8  bg-light bg-opacity-25 shadow  mx-auto  p-5 rounded-4'>
          <h3 className='fw-bold text-main text-center'>CheckOut :</h3>
          <div className='pt-3 '>
            <form onSubmit={formik.handleSubmit}>

              <label htmlFor="details">details :</label>
              <input onChange={formik.handleChange} value={formik.values.details}
                className='form-control mb-3' type="text" name="details" id="details" />

              <label htmlFor="city">city :</label>
              <input onChange={formik.handleChange} value={formik.values.city}
                className='form-control mb-3' type="text" name="city" id="city" />

              <label htmlFor="phone">phone :</label>
              <input onChange={formik.handleChange} value={formik.values.phone}
                className='form-control mb-3' type="tel" name="phone" id="phone" />

              {isLoading ? <button className='btn bg-main text-white border-main w-100' type='button'>
                <i className="fas fa-spinner fa-spin"></i>
              </button> : <button disabled={!(formik.isValid && formik.dirty)}
                className='btn bg-main text-white border-main w-100' type='submit'>pay</button>}


            </form>
          </div>
        </div>
      </div>
    </div>

  </>
}
