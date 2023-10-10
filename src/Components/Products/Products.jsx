import React, { useContext, useEffect } from "react";
import style from "./Products.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Puff } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import logo from "../../Assets/Images/favicon.ico";
import { wishlistContext } from "../WishlistContext/WishlistContext";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  let { addToWishlist } = useContext(wishlistContext);
  let { addToCart, setcartProductNum } = useContext(cartContext);
  async function addProductToCart(id) {
    let { data } = await addToCart(id);
    if (data?.status === "success") {
      toast.success("Product Add Successfully", {
        duration: 3000,
        position: "top-center",

        style: {
          border: " 2px solid #61d345",
        },
      });

      setcartProductNum(data?.numOfCartItems)
    } else {
      toast.error("Failed to add product", {
        duration: 3000,
        position: "top-center",

        style: {
          border: " 2px solid #ff4b4b",
        },
      });
    }
  }

  async function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading } = useQuery(
    "getFeaturedProducts",
    getFeaturedProducts
  );

  function changeIconColor(id) {
    id.className += " color-red";
  }

  async function AddProductToWishlist(id) {
    let { data } = await addToWishlist(id);
    if (data.status == "success") {
      toast.success(`Product Added Successfully`);
    } else {
      toast.error("Failed to add product !");
    }
  }

  const filteredProducts = data?.data.data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <link rel="icon" href={logo} />
      </Helmet>

      {isLoading ? (
        <div className="vh-100 w-100 d-flex py-5 justify-content-center align-items-center">
          <Puff
            height="80"
            width="80"
            radius={1}
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search by Product Name..."
            className="form-control m-3"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="row py-2 mt-3">
            {filteredProducts?.map((product) => (
              <div key={product.id} className="col-lg-3 col-xl-2 col-md-3 col-sm-6 position-relative">
                <div className="product cursor-pointer py-3 px-2">
                  <Link to={`/productdetails/${product.id}`}>
                    <img
                      className="w-100"
                      src={product.imageCover}
                      alt={product.title}
                    />

                    <span className="text-main font-sm fw-bolder">
                      {product.category.name}
                    </span>
                    <h3 className="h6">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>

                    <div className=" d-flex justify-content-between mt-3">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>{" "}
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>

                  <i
                    onClick={(e) => {
                      AddProductToWishlist(product.id);
                      changeIconColor(e.target);
                    }}
                    id="hearIcon"
                    className="fa-solid fa-heart heartIcon"
                  ></i>

                  <button
                    onClick={() => addProductToCart(product.id)}
                    className=" btn bg-main text-white w-100 btn-sm mt-2"
                  >
                    add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
