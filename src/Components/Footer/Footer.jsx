import React from 'react'
import amazon from '../../assets/images/amazonpay-logo-rgb-clr.svg'
export default function Footer() {

  return <>
    <footer className='bg-main-light  my-5 pt-3 mb-auto'>
      <div className="container ">
        <h3>Get The FreshCart App</h3>
        <p className='text-muted'>We will send you a link, Open it in your phone to download App</p>
        <div className="row">

          <div className="col-md-10">
            <input disabled type="email" placeholder='Email....' className='form-control' />
          </div>

          <div className="col-md-2 uu">
            <button className='btn bg-main text-white w-100'>Share App Link</button>
          </div>

          <div className=" d-flex justify-content-between  border-top border-bottom my-4 ">

            <div className='left'>
              <p className='py-3 '><span className='h5 me-3'>Payment Partners</span>
                <img className='img' src={amazon} alt="Amazon log" />
                <img className='img' src={require('../../assets/images/americanexpress.jpg')} alt="amerian express logo" />
                <img className='img' src={require('../../assets/images/MasterCard_Logo.svg.png')} alt="mastercard logo" />
                <img className='img' src={require('../../assets/images/PayPal-Logo.png')} alt="paypal logo" />
              </p>
            </div>

            <div className='right d-flex justify-content-center align-items-center'>
              <h5 className='mx-3'>Get deliveries with FreshCart</h5>
              <img className='app' src=
                {require('../../assets/images/360_F_371954077_optGuvGbji51IXB3MuJsodhSqTD0sd3W.jpg')} alt="" />
            </div>

          </div>

        </div>
      </div>
    </footer>
  </>
}