import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../shared/Loading";

const AdvertiseProduct = () => {
  const { user } = useContext(AuthContext);

  const { data: advertises, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await fetch(
        "https://react-assignment-resale-products-server.vercel.app/product"
      );
      const data = await res.json();
      const adData = data.filter((p) => p.ad);
      return adData;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      {advertises && advertises.length > 0 ? (
        <h2 className="text-2xl font-semibold pt-10 text-center text-purple-700 dark:text-white">
          Advertising Products
        </h2>
      ) : (
        <></>
      )}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5  my-5 lg:mx-4 md:mx-5 sm-width">
        {advertises &&
          advertises.map((advertise) => (
            <>
              <div
                key={advertise._id}
                className="card lg:card-side  bg-[#A2CBD2] shadow-xl rounded-md  dark:bg-black dark:border dark:text-gray-100 mx-auto py-5 mt-5"
              >
                <figure className="lg:pl-3 md:pl-3">
                  <img
                    src={advertise.img}
                    alt=""
                    className="object-cover object-center w-60 rounded-md h-4/5 dark:bg-gray-500"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex items-center space-x-2">
                    <h2 className="card-title mr-5">
                      Seller Name: {advertise.sellerName}
                    </h2>
                  </div>
                  <h2 className="text-xl font-semibold tracking-wide">
                    Product Name: {advertise.name}
                  </h2>
                  <div className="lg:flex md:flex lg:space-x-4 md:space-x-4">
                    <p>Original Price: {advertise.originalPrice}</p>
                    <p>Resale Price: {advertise.resalePrice}</p>
                  </div>
                  <div className="lg:flex md:flex lg:space-x-3 md:space-x-3">
                    <p>Purchase year: {advertise.purchaseYear}</p>
                    <p>Post Date: {advertise.postedDate}</p>
                  </div>
                  <div className="lg:flex md:flex"></div>
                  {user?.email ? (
                    <Link to={`/products/${advertise.category_id}`}>
                      <label
                        htmlFor="booking-modal"
                        className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white"
                      >
                        See Details
                      </label>
                    </Link>
                  ) : (
                    <Link to="/login">
                      <label
                        htmlFor="booking-modal"
                        className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white"
                      >
                        See Details
                      </label>
                    </Link>
                  )}
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default AdvertiseProduct;
