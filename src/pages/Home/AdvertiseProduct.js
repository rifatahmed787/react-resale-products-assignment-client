import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../shared/Loading";
import "./Category.css";
import { Icon } from "@iconify/react";

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
        <h2 className="text-2xl font-bold pt-10 font-serif text-center text-[#005C5A] dark:text-white underline underline-offset-8">
          Advertising Products
        </h2>
      ) : (
        <></>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-3 my-5 lg:mx-4 md:mx-5 sm-width dark:text-white">
        {advertises &&
          advertises.map((advertise) => (
            <div
              key={advertise._id}
              className="card solution_cards_box w-11/12 bg-[#FFFFFF] h-[500px] shadow-xl rounded-md gap-x-5 border-2 hover:border-[#057EF9] dark:border  dark:bg-black mx-auto py-5 mt-5"
              data-aos="fade-up"
            >
              <figure className="px-5 pt-5 mb-5">
                <img
                  src={advertise.img}
                  alt=""
                  className="object-cover object-center w-60 rounded-md  dark:bg-gray-500"
                />
              </figure>
              <div className="card-body">
                <div>
                  <p className="text-center">
                    {advertise.purchaseYear} - {advertise.postedDate}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon="gg:profile" width="25" />
                  <p className=" mr-5">
                    <span className="text-xl">{advertise.sellerName}</span>
                  </p>
                </div>
                <h2 className="flex items-center gap-2">
                  <Icon icon="ri:product-hunt-line" width="25" />

                  <span className="text-xl">{advertise.name}</span>
                </h2>
                <div className="flex items-center gap-2">
                  <Icon icon="game-icons:price-tag" width="20" />
                  <p className="space-x-2 text-lg pl-1">
                    <span className="font-semibold"></span>$
                    {advertise.resalePrice}
                    <span className="line-through text-gray-500">
                      {advertise.originalPrice}
                    </span>
                  </p>
                </div>
              </div>
              <div className="card-actions justify-end mr-5">
                {user?.email ? (
                  <Link to={`/products/${advertise.category_id}`}>
                    <label className="btn-3 custom-btn text-center hover:text-white">
                      <span> See Details</span>
                    </label>
                  </Link>
                ) : (
                  <Link to="/login">
                    <label className="btn-3 custom-btn text-center">
                      <span> See Details</span>
                    </label>
                  </Link>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdvertiseProduct;
