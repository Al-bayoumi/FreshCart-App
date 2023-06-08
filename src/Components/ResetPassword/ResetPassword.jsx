import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ResetPassword() {

  
  let baseUrl = 'https://ecommerce.routemisr.com/';
  let [isLoading, setIsLoading] = useState(false);
  let [messageError, setMessageError] = useState('');
  let navigate = useNavigate();
// *****************  resetPassword *****************************
  let validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    newPassword: Yup.string().required('password is required')
      .matches(/^[A-Z][a-z0-9!@]{3,16}$/, 'password must start with uppercase......')
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: ""
    },
    validationSchema,
    onSubmit: (values) => {
      resetPassword(values);
    },
  });

  async function resetPassword(values){
    setIsLoading(true);
    try {
      const {data} = await axios.put(`${baseUrl}api/v1/auth/resetPassword`,values)
      console.log(data);
      setIsLoading(false);
      if(data.token != null){
        toast.success("Your Password Changed Successfully",{duration:2000,className:"text-success px-4 fw-bolder"});
        navigate('/login');
      }
  
    } catch (error) {
      console.log('Error : ',error);
      toast.error(error.response.data.message,{duration:2000});
      setIsLoading(false);
    }
  }

  // *****************  showNewPassword *****************************
  function showNewPassword(){
    let showNewPass = document.getElementById('newPassword');
    if(showNewPass.type === "password"){
      showNewPass.type = "text";
    }else{
      showNewPass.type = "password";
    }
  }
// *******************************************************************


  return <>
    <Helmet>
      <title>resetPassword</title>
    </Helmet>
    <div className="w-75 mx-auto py-4">
      <h2 className='bolder mb-3'>Reset New Password : </h2>

      {messageError !== '' ? <div className="alert alert-danger">{messageError}</div> : null}

      <form className='form' onSubmit={formik.handleSubmit}>

        <div className="my-3">
          <label htmlFor="email">Email :</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
            className='form-control mt-2' type="email" name="email" id="email" />
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}
          </div> : null}
        </div>

        <div className="my-3">
          <label htmlFor="newPassword">New Password :</label>
          <input onChange={formik.handleChange} className='form-control mt-2' type="password"
            name="newPassword" id="newPassword" />
          {formik.errors.Password && formik.touched.Password ? <div className='alert alert-danger'>{formik.errors.Password}
          </div> : null}
          <i class="fa-solid fa-eye fs-5 position-absolute end-0 top-0 p-2" onClick={showNewPassword} id="togglePassword"></i>
        </div>

        <div className="d-flex justify-content-end">
          {isLoading ? <button className='btn bg-main text-white' type='button'><i className="fas fa-spinner fa-spin"></i>
          </button> : <button disabled={!(formik.isValid && formik.dirty)}
            className='btn bg-main text-white' type='submit'>Update Password</button>}
        </div>

      </form>
    </div>
  </>
}