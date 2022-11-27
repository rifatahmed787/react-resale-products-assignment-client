import React from "react";

const AllProductsDetails = ({ product, setServiceModal }) => {
  const {
    img,
    sellerName,
    name,
    location,
    originalPrice,
    resalePrice,
    purchaseYear,
    postedDate,
    mobile,
  } = product;
  return (
    <div>
      <div className="max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100 mx-auto py-5">
        <img
          src={img}
          alt=""
          className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-wide">
              Seller: {sellerName}
            </h1>
            <h2 className="text-xl font-semibold tracking-wide">
              Product: {name}
            </h2>
            <p className="dark:text-gray-100">Location: {location}</p>
            <p>Original Price:{originalPrice}</p>
            <p>Resale Price: {resalePrice}</p>
            <p>Year of purchase: {purchaseYear}</p>
            <p>Post Date: {postedDate}</p>
            <p>Mobile: {mobile}</p>
          </div>
          <label
            htmlFor="booking-modal"
            className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white"
            onClick={() => setServiceModal(product)}
          >
            Book Now
          </label>
        </div>
      </div>
    </div>
  );
};

export default AllProductsDetails;
