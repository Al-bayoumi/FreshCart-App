import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';

export default function Login({ saveUserData }) {

  let baseurl = 'https://ecommerce.routemisr.com/';
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  let Navigate = useNavigate();

  // ***************************************************************
  async function handleLogin(values) {
    try {
      setIsLoading(true);
      let { data } = await axios.post(`${baseurl}api/v1/auth/signin`, values).catch((error) => {
        setMessageError(error.response.data.message);
        setIsLoading(false);
      })
      if (data.message === 'success') {
        toast.success('You can create a new Password', { duration: 2000, className: "text-success px-4 fw-bolder" });
        localStorage.setItem('userToken', data.token);
        saveUserData();
        setIsLoading(false);
        Navigate('/')
      }
    } catch (error) {
      console.log('Error : ', error);
      setIsLoading(false);
      toast.error(error.response.data.message, { duration: 2000, className: "text-danger px-4 fw-bolder" });
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('password is required')
      .matches(/^[A-Z][a-z0-9!@]{3,16}$/, 'password must start with uppercase......'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  });

  // ****************************************************************
  return <>
    <Helmet>
      <title>Login</title>
    </Helmet>

    <div className="container mx-auto pt-5">
      <div className="row  d-flex justify-content-center align-items-center pb-lg-5 ">
        <div className='col-md-10  bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-4'>
          <h1 className='fw-bold text-main text-center'>Login Now :</h1>
          <div className='pt-3'>
            <form onSubmit={formik.handleSubmit}>
              {messageError !== '' ? <div className="alert alert-danger">{messageError}</div> : null}

              <div className="my-3">
                <label htmlFor="email">Email :</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
                  className='form-control mt-2' type="email" name="email" id="email" />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>
                  {formik.errors.email}</div> :
                  null}
              </div>

              <div className="my-3">
                <label htmlFor="password">Password :</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
                  className='form-control mt-2' type="password" name="password" id="password" />
                {formik.errors.password && formik.touched.password ? (<div className='alert alert-danger'>
                  {formik.errors.password}
                </div>) : null}
              </div>

              <div className="float-start">
                {isLoading ? <button className='btn bg-main text-white' type='button'>
                  <i className="fas fa-spinner fa-spin"></i>
                </button> : <button disabled={!(formik.isValid && formik.dirty)}
                  className='btn bg-main text-white' type='submit'>Login</button>}
              </div>

              <Link to="/ForgetPassword" className='text-white'>
                <div className="float-end">
                  <button className='btn bg-main text-white' type='submit'>Forget Password ?</button>
                </div>
              </Link>

            </form>
          </div>
        </div>
      </div>
    </div>

  </>
}
