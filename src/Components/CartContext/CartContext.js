import axios from "axios";
import { useQuery } from "react-query";

const { createContext, useState, useEffect } = require("react");

export let cartContext = createContext();

let headers = {
  token: localStorage.getItem("userToken"),
};

function deleteCart() {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers,
    })
    .then((response) => response)
    .catch((errors) => errors);
}

function removeCartItem(id) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers,
    })
    .then((response) => response)
    .catch((errors) => errors);
}

function getUserCart() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers,
    })
    .then((response) => response)
    .catch((error) => error);
}

function updateCountProduct(id, count) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count,
      },
      {
        headers,
      }
    )
    .then((response) => response)
    .catch((errors) => errors);
}

function onlinePayment(cartId, values) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
      {
        shippingAddress: values,
      },
      {
        headers,
        params: { url: "https://kareememad52.github.io/ecommerce/#" },
      }
    )
    .then((response) => response)
    .catch((errors) => errors);
}

function clearCartItem() { 
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
    headers
  }).then((response) => response)
  .catch((errors) => errors);
 }

function addToCart(id) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId: id,
      },
      {
        headers,
      }
    )
    .then((response) => response)
    .catch((errors) => errors);
}

export default function CartContextProvider(props) {
  let [cartId, setCartId] = useState(null);

  let [cartProductNum, setcartProductNum] = useState(0);

  async function getCartId() {
    let { data } = await getUserCart();
    setCartId(data?.data._id);
    if (data?.numOfCartItems != undefined) {
      setcartProductNum(data?.numOfCartItems);
    } else if (data?.numOfCartItems == undefined) {
      setcartProductNum(0);
    }
  }

  useEffect(() => {
    getCartId();
  }, []);

  return (
    <cartContext.Provider
      value={{
        addToCart,
        deleteCart,
        cartProductNum,
        setcartProductNum,
        cartId,
        onlinePayment,
        getUserCart,
        removeCartItem,
        updateCountProduct,
        clearCartItem
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
