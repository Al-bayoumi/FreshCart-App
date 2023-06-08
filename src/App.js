import logo from './logo.svg';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import { CartContextProvider } from './Components/Context/CartContext';
import LayOut from './Components/LayOut/LayOut';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import BrandDetails from './Components/BrandDetails/BrandDetails';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import NotFound from './Components/NotFound/NotFound';
import CheckOut from './Components/CheckOut/CheckOut';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import CategoryDetails from './Components/CategorieyDetails/CategoryDetails';

export default function App() {

  const [userData, setUserData] = useState(null);


  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData();
    }
  }, []);

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwt_decode(encodedToken);
    setUserData(decodedToken);
  }


  let routers = createHashRouter([
    {
      path: "", element: <LayOut setUserData={setUserData} userData={userData} />, children: [
        { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: "products", element: <ProtectedRoute> <Products /></ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute> <Categories /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "ProductDetails/:id", element: <ProtectedRoute> <ProductDetails /></ProtectedRoute> },
        { path: "prandDetails/:id", element: <ProtectedRoute> <BrandDetails /></ProtectedRoute> },
        { path: "categoryDetails/:id", element: <ProtectedRoute> <CategoryDetails /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "CheckOut", element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register saveUserData={saveUserData} /> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ]);
  return <CartContextProvider>
    <Toaster />
    <RouterProvider router={routers}></RouterProvider>
  </CartContextProvider>
}
