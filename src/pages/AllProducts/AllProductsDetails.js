import React from "react";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";

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
    email,
  } = product;

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://react-assignment-resale-products-server.vercel.app/users"
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <div className="card lg:card-side  bg-[#A2CBD2] shadow-xl rounded-md  dark:bg-black dark:border dark:text-gray-100 mx-auto py-5">
        <figure className="lg:pl-3 md:pl-3">
          <img
            src={img}
            alt=""
            className="object-cover object-center w-60 rounded-md h-4/5 dark:bg-gray-500"
          />
        </figure>
        <div className="card-body">
          <div className="flex items-center">
            <h2 className="card-title mr-5">Seller Name: {sellerName}</h2>
            {users.map((user) => (
              <div>
                {user.verified ? (
                  <Icon icon="arcticons:okta-verify" width="32" />
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
          <h2 className="text-xl font-semibold tracking-wide">
            Product Name: {name}
          </h2>
          <div className="lg:flex md:flex">
            <p>Original Price: {originalPrice}</p>
            <p>Resale Price: {resalePrice}</p>
          </div>
          <div className="lg:flex md:flex">
            <p>Purchase year: {purchaseYear}</p>
            <p>Post Date: {postedDate}</p>
          </div>
          <div className="lg:flex md:flex">
            <p className="dark:text-gray-100">Location: {location}</p>
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
