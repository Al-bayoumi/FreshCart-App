import React from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


export default function LayOut({ userData, setUserData }) {

  let navigate = useNavigate();

  function logOut() {
    Swal.fire({
      title: 'هل تريد الاستمرار؟',
      icon: 'question',
      iconHtml: '؟',
      cancelButtonText: 'نعم',
      confirmButtonText: 'لا',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userToken');
        setUserData(null);
        navigate('/login');
      }
    });
  }

  return <>
    <div className="pt-5">

      <Navbar logOut={logOut} setUserData={setUserData} userData={userData} />
      <div className="container">
        <Outlet></Outlet>
      </div>
      <Footer />

    </div>

  </>
}
