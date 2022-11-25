import React from "react";
import PrimaryButton from "../../components/PrimaryButton";

const AllProductsDetails = ({ product }) => {
  const {
    img,
    name,
    location,
    originalPrice,
    resalePrice,
    purchaseYear,
    postedDate,
    mobile,
    condition,
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
            <h2 className="text-3xl font-semibold tracking-wide">{name}</h2>
            <p className="dark:text-gray-100">{location}</p>
            <p>Original Price:{originalPrice}</p>
            <p>Resale Price: {resalePrice}</p>
            <p>Year of purchase: {purchaseYear}</p>
            <p>Post Date: {postedDate}</p>
            <p>Mobile: {mobile}</p>
            <p>Condition: {condition}</p>
          </div>
          <PrimaryButton>Book Now</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default AllProductsDetails;
