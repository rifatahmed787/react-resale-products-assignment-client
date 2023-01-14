import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/image/img1.jpg";
import img2 from "../../assets/image/img2.jpg";
import img3 from "../../assets/image/img3.jpg";
import "./Category.css";

const Banner = () => {
  return (
    <div>
      <div className="p-6 py-12   bg-[#149777] dark:bg-[#08221c]">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h2 className="text-center text-6xl tracking-tighter font-bold dark:text-gray-300">
              Up to <br /> 10% discount
            </h2>
            <div className="space-x-2  text-center py-2 lg:py-0 lg:flex margin-bottom">
              <img src={img1} alt="" className="w-40 ml-2 margin-bottom" />
              <img src={img2} alt="" className="w-40 margin-bottom" />
              <img src={img3} alt="" className="w-40 " />
            </div>
            <Link
              href="#"
              rel="noreferrer noopener"
              className="btn btn-primary bg-gradient-to-r  hover:from-pink-500 hover:to-yellow-500"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
