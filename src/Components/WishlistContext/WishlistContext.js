import axios from "axios";
import { createContext } from "react";

export let wishlistContext = createContext();

let headers = {
  token: localStorage.getItem("userToken"),
};

function addToWishlist(id) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: id,
      },
      {
        headers,
      }
    )
    .then((response) => response)
    .catch((error) => error);
}

function getWishlist() {
  return axios
    .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers,
    })
    .then((response) => response)
    .catch((error) => error);
}

function removeFromWishlist(id) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
      headers,
    })
    .then((response) => response)
    .catch((error) => error);
}

export function WishlistContextProvider({ children }) {
  return (
    <wishlistContext.Provider
      value={{ addToWishlist, getWishlist, removeFromWishlist }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
