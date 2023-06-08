import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ForgetPassword() {

  const baseUrl = 'https://ecommerce.routemisr.com/';
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [codeFlag, setCodeFlag] = useState(false);
  const navigate = useNavigate();


  // *************** validationSchema **************************************

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
  });

  const formik1 = useFormik({
    initialValues: {
      email: '',
      resetCode: '',
    },
    validationSchema,
    onSubmit: values => {
      forgetPassword(values);
    },
  });

  const formik2 = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: values => {
      resetCode(values);
    },
  });

  // *************** forgetPassword ********************
  async function forgetPassword(valueObject) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${baseUrl}api/v1/auth/forgotPasswords`, valueObject);
      console.log(data);
      if (data.statusMsg === 'success') {
        toast.success('You can create a new Password', { duration: 2000, className: "text-success px-4 fw-bolder" });
        setCodeFlag(true);
      }
    } catch (error) {
      console.log('Error : ', error);
      setIsLoading(false);
      toast.error(error.response.data.message, { duration: 2000, className: "text-danger px-4 fw-bolder" });
    }
    setIsLoading(false);
  };
  // *************** resetCode *************************
  async function resetCode(valueObject) {
    try {
      let { data } = await axios.post(`${baseUrl}api/v1/auth/verifyResetCode`, valueObject).catch(error => {
        setMessageError(error.response.data.message);
      });
      if (data.status === 'Success') {
        toast.success('You can create a new Password', { duration: 2000, className: "text-success px-4 fw-bolder" });
        navigate('/resetPassword');
      }
    } catch (error) {
      console.log('Error : ', error);
      setIsLoading(false);
      toast.error(error.response.data.message, { duration: 2000, className: "text-danger px-4 fw-bolder" });
    }
  };

  // ***************/resetCode *********************
  return <>
    <Helmet>
      <title>ForgetPassword</title>
    </Helmet>

    <div className="container mx-auto pt-5 pb-5">
      <div className="row  d-flex justify-content-center align-items-center pb-lg-5 ">
        <div className='col-md-10  bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-4'>
          <div className='pt-3'>

            {codeFlag ? <form onSubmit={formik2.handleSubmit}>
              {messageError !== '' ? <div className="alert alert-danger">{messageError}</div> : null}

              <div className="my-3">
                <label htmlFor="resetCode">Reset Code :</label>
                <input onChange={formik2.handleChange} className="form-control mt-2" type="text"
                  name="resetCode" id="resetCode" />
                {formik2.errors.resetCode ? <div className="alert alert-danger"> {formik2.errors.resetCode}</div> : null}
              </div>

              <div className="d-flex justify-content-end">
                {isLoading ? <button className="btn bg-main text-white" type="button">
                  <i className="fas fa-spinner fa-spin"></i>
                </button> : <button disabled={!(formik2.isValid && formik2.dirty)}
                  className="btn bg-main text-white" type="submit" > Confirm Code </button>}
              </div>

            </form> : <form onSubmit={formik1.handleSubmit} className="my-3">

              <div className="my-3">
                <label htmlFor="email">Email :</label>
                <input onChange={formik1.handleChange} className="form-control mt-2" type="email" name="email" id="email" />
                {formik1.errors.email ? <div className="alert alert-danger"> {formik1.errors.email}</div> : null}
              </div>

              <div className="float-start">
                {isLoading ? <button className="btn bg-main text-white" type="button">
                  <i className="fas fa-spinner fa-spin"></i>
                </button> : <button disabled={!(formik1.isValid && formik1.dirty)}
                  className="btn bg-main text-white" type="submit" > Send Code </button>}
              </div>

            </form>}
          </div>
        </div>
      </div>
    </div>

  </>
}