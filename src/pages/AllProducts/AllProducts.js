import React from "react";
import { useLoaderData } from "react-router-dom";
import AllProductsDetails from "./AllProductsDetails";

const AllProducts = () => {
  const products = useLoaderData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-5 lg:mx-3">
      {products.map((product) => (
        <AllProductsDetails
          key={product._id}
          product={product}
        ></AllProductsDetails>
      ))}
    </div>
  );
};

export default AllProducts;
