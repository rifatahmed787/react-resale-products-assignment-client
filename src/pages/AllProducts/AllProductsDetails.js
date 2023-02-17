import React from "react";
import { useQuery } from "@tanstack/react-query";
import verify from "../../assets/image/veryfied.png";
import "./AllProducts.css";
import { Icon } from "@iconify/react";

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
      <div className="card solution_cards_box  bg-[#FFFFFF] w-11/12 h-[550px] shadow-xl rounded-md gap-x-5 border-2 hover:border-[#057EF9] dark:border  dark:bg-black mx-auto py-5 mt-5">
        <figure className="px-5 pt-5">
          <img
            src={img}
            alt=""
            className="object-cover object-center w-60 rounded-md dark:bg-gray-500"
          />
        </figure>
        <div className="card-body py-5">
          <div className="flex items-center justify-center">
            <p className="text-center">
              {purchaseYear} - {postedDate}
            </p>
          </div>
          <div>
            <h2 className="flex items-center space-x-3">
              <Icon icon="gg:profile" width="25" />
              <span className="text-xl">{sellerName}</span>
              {users.map((user, i) => (
                <div key={i}>
                  {user?.verified && (
                    <img src={verify} alt="" className="w-4" />
                  )}
                </div>
              ))}
            </h2>
          </div>
          <h2 className="flex items-center gap-3">
            <Icon icon="ri:product-hunt-line" width="25" />

            <span className="text-xl">{name}</span>
          </h2>
          <div className="flex items-center gap-3">
            <Icon icon="game-icons:price-tag" width="20" />
            <p className="space-x-2 text-lg pl-1">
              <span className="font-semibold"></span>${resalePrice}
              <span className="line-through text-gray-500">
                {originalPrice}
              </span>
            </p>
          </div>

          <div className="space-y-3">
            <p className="dark:text-gray-100 flex items-center gap-3">
              <Icon icon="material-symbols:location-on-outline" width="25" />
              {location}
            </p>
            <p className="flex items-center gap-1.5">
              <Icon icon="material-symbols:phone-in-talk-outline" width="25" />
              <span className="font-semibold"></span> {mobile}
            </p>
          </div>
        </div>
        <div className="card-actions justify-end pr-5">
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
