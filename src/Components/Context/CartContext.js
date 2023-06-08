import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const cartContext = createContext(null);

export function CartContextProvider(props) {

  let baseurl = 'https://ecommerce.routemisr.com/';
  const headers = { token: localStorage.getItem('userToken') };
  const [cartId, setcartId] = useState(null);
  const [numOfCartItems, setnumOfCartItems] = useState(0);



  async function getCart() {
    let response = await getLoggedUserCart();
    if (response?.data?.status === 'success') {
      setnumOfCartItems(response.data.numOfCartItems);
      setcartId(response.data.data._id);
    }
    console.log(response);
  }

  useEffect(() => {
    getCart();
  }, [])


  function addToCart(productId) {
    return axios.post(`${baseurl}api/v1/cart`,
      {
        productId: productId
      },
      {
        headers: headers
      })
      .then((response) => response)
      .catch((error) => error);
  };


  function getLoggedUserCart() {
    return axios.get(`${baseurl}api/v1/cart`,
      {
        headers: headers
      })
      .then((response) => response)
      .catch((error) => error);
  };

  function removeItem(productId) {
    return axios.delete(`${baseurl}api/v1/cart/${productId}`,
      {
        headers: headers
      })
      .then((response) => response)
      .catch((error) => error);
  };


  function updateProductCount(productId, count) {
    return axios.put(`${baseurl}api/v1/cart/${productId}`,
      {
        count: count
      },
      {
        headers: headers
      })
      .then((response) => response)
      .catch((error) => error);
  };


  function onlinePayment(cartId, shippingAddress) {
    return axios
      .post(`${baseurl}api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shippingAddress: shippingAddress
        },
        {
          headers: headers
        })
      .then((response) => response)
      .catch((error) => error);
  };

  return <>
    <cartContext.Provider value={{
      addToCart, getLoggedUserCart, removeItem, updateProductCount,
      onlinePayment, cartId, numOfCartItems, setnumOfCartItems,
    }}>
      {props.children}
    </cartContext.Provider>
  </>

}