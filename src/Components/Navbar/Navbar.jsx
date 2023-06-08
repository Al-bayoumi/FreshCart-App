import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg'
import { cartContext } from '../Context/CartContext';



export default function Navbar({ userData, logOut }) {

  let { numOfCartItems } = useContext(cartContext);

  return <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-light bg-light fixed-top">
      <div class="container">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="" />
        </NavLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

          {userData !== null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                to="categories">Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="brands">Brands</NavLink>
            </li>
          </ul> : null}

          {userData !== null ? <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/">
                <div className="bg-light bg-opacity-25 shadow px-4 pt-2 pb-1 w-100 mx-auto rounded-3 ">
                  <h3 className='h6 text-main logo-text'> Hello, {userData?.name}</h3>
                </div>
              </NavLink>
            </li>
          </ul> : null}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <Link target='_blank' to={'http://facebook.com/Elbayoumi.10'}>
                <i className='fab fa-facebook '></i>
              </Link>
              <Link target='_blank' to={'http://instagram.com/mohamedel_bayoumi'}>
                <i className='fab fa-instagram mx-2'></i>
              </Link>
              <Link target='_blank' to={"http://twitter.com/elbayoumi_10"}>
                <i className='fab fa-twitter '></i>
              </Link>
              <Link target='_blank' to={'http://linkedin.com/in/mohamed-el-bayoumi-67b0a6260'}>
                <i class="fab fa-linkedin mx-2 "></i>
              </Link>
              <Link target='_blank' to={'https://github.com/Al-bayoumi'}>
                <i class="fab fa-github "></i>
              </Link>
              <Link target='_blank' to={"http://youtube.com"}>
                <i className="fab fa-youtube mx-2 "></i>
              </Link>
              <Link target='_blank' to={"http://tiktok.com"}>
                <i className="fab fa-tiktok me-3 "></i>
              </Link>
            </li>

            {userData === null ? <>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="login">
                  <i class="fa-solid fa-user"></i> Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  to="register">Register
                </NavLink>
              </li></> :
              <>
                <li className="nav-item position-relative">
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link px-2"} to="cart">
                    <i className='fas fa-shopping-cart fa-lg'></i>
                    <span className='badge position-absolute bg-main text-white top-0 end-0'>
                      {numOfCartItems}
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Link onClick={logOut} className="cursor-pointer nav-link">SignOut</Link>
                </li>
              </>}


          </ul>

        </div>
      </div>
    </nav >


  </>
}
