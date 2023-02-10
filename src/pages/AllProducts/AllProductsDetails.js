import React from "react";
import { useQuery } from "@tanstack/react-query";
import verify from "../../assets/image/veryfied.png";
import "./AllProducts.css";
import "../Home/AdvertiseProduct.css";

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
      const userData = data.filter((user) => user.email === email);
      return userData;
    },
  });

  return (
    <div>
      <div className="card solution_cards_box bg-white lg:card-side shadow-xl rounded-md border-2 hover:border-[#057EF9] dark:bg-black dark:border mx-auto py-5 mt-5">
        <figure className="lg:pl-3 md:pl-3">
          <img
            src={img}
            alt=""
            className="object-cover object-center w-60 rounded-md h-4/5 dark:bg-gray-500"
          />
        </figure>
        <div className="card-body">
          <div>
            <h2 className="flex items-center">
              <span className="text-xl font-semibold">Seller Name: </span>{" "}
              <span className="text-xl mr-2">{sellerName}</span>
              {users.map((user) => (
                <div>
                  {user?.verified && (
                    <img src={verify} alt="" className="w-5" />
                  )}
                </div>
              ))}
            </h2>
          </div>
          <h2>
            <span className="text-xl font-semibold">Product Name:</span>{" "}
            <span className="text-xl">{name}</span>
          </h2>
          <div className="lg:flex md:flex">
            <p>
              <span className="font-semibold">Original Price:</span>{" "}
              {originalPrice}
            </p>
            <p>
              <span className="font-semibold">Resale Price:</span> {resalePrice}
            </p>
          </div>
          <div className="lg:flex md:flex">
            <p>
              <span className="font-semibold">Purchase year:</span>{" "}
              {purchaseYear}
            </p>
            <p>
              <span className="font-semibold">Post Date:</span> {postedDate}
            </p>
          </div>
          <div className="lg:flex md:flex">
            <p className="dark:text-gray-100">
              <span className="font-semibold">Location:</span> {location}
            </p>
            <p>
              <span className="font-semibold">Mobile:</span> {mobile}
            </p>
          </div>
          <label
            htmlFor="booking-modal"
            className="btn btn-3 custom-btn text-center text-white"
            onClick={() => setServiceModal(product)}
          >
            <span>Book Now</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AllProductsDetails;
