import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';


export default function Register({ saveUserData }) {

  let baseurl = 'https://ecommerce.routemisr.com/';
  let Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  // *********************** formik ****************************************

  async function handleRegister(values) {
    try {
      setIsLoading(true);
      let { data } = await axios.post(`${baseurl}api/v1/auth/signup`, values).catch((error) => {
        setMessageError(error.response.data.message);
        setIsLoading(false);
      })
      if (data.message === 'success') {
        toast.success('You can create a new Password', { duration: 2000, className: "text-success px-4 fw-bolder" });
        localStorage.setItem('userToken', data.token);
        saveUserData();
        setIsLoading(false);
        Navigate('/login')
      }
    } catch (error) {
      console.log('Error : ', error);
      setIsLoading(false);
      toast.error(error.response.data.message, { duration: 2000, className: "text-danger px-4 fw-bolder" });
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(3, 'name minlength is 3').max(20, 'name maxlength is 20'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('password is required')
      .matches(/^[A-Z][a-z0-9!@]{3,16}$/, 'password must start with uppercase......'),
    rePassword: Yup.string().required('rePassword is required')
      .oneOf([Yup.ref('password')], 'password and rePassword does match'),
    phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'phone must valid number....'),
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: handleRegister
  });
  // ************************* showPassword ***********************
  function showPassword() {
    let showPass = document.getElementById('password');
    if (showPass.type === "password") {
      showPass.type = "text";
    } else {
      showPass.type = "password";
    };
  };

  function showRePassword() {
    let showRePass = document.getElementById('rePassword');
    if (showRePass.type === "password") {
      showRePass.type = "text";
    } else {
      showRePass.type = "password"
    }
  };
  // *************************************************************
  return <>
    <Helmet>
      <title>Register</title>
    </Helmet>

    <div className="container mx-auto pt-5 ">
      <div className="row  d-flex justify-content-center align-items-center pb-lg-5 ">
        <div className='col-md-10  bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-4'>
          <h1 className='fw-bold text-main text-center'>Registration Form :</h1>
          <div className='pt-3'>
            <form onSubmit={formik.handleSubmit}>
              {messageError !== '' ? <div className="alert alert-danger">{messageError}</div> : null}

              <div className="my-3">
                <label htmlFor="name">Name :</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}
                  className='form-control mt-2' type="text" name="name" id="name" />
                {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>
                  {formik.errors.name}</div> : null}
              </div>

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
                <i class="fa-solid fa-eye fs-5 position-absolute end-0 top-0 p-2" onClick={showPassword} ></i>
              </div>

              <div className="my-3 ">
                <label htmlFor="rePassword">rePassword :</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword}
                  className='form-control mt-2' type="password" name="rePassword" id="rePassword" />
                {formik.errors.rePassword && formik.touched.rePassword ? (<div className='alert alert-danger'>
                  {formik.errors.rePassword} </div>) : null}
                <i class="fa-solid fa-eye fs-5 position-absolute end-0 top-0 p-2" onClick={showRePassword} ></i>
              </div>

              <div className="my-3">
                <label htmlFor="phone">Phone :</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}
                  className='form-control mt-2' type="tel" name="phone" id="phone" />
                {formik.errors.phone && formik.touched.phone ? (<div className='alert alert-danger'>{formik.errors.phone}
                </div>) : null}
              </div>

              <div className="float-start">
                {isLoading ? <button className='btn bg-main text-white' type='button'>
                  <i className="fas fa-spinner fa-spin"></i>
                </button> : <button disabled={!(formik.isValid && formik.dirty)}
                  className='btn bg-main text-white' type='submit'>Register</button>}
              </div>


            </form>
          </div>
        </div>
      </div>
    </div >




  </>
}
