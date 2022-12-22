import React from "react";
import { Link } from "react-router-dom";
import png from "../../assets/image/shipping.png";
import PrimaryButton from "../../components/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import "./Category.css";

const Delivery = () => {
  return (
    <div className="p-6 py-12 dark:bg-violet-400 shadow-lg rounded-lg lg:mx-20  dark:text-gray-900">
      <div className="container mx-auto">
        <div className="lg:flex flex-col lg:flex-row items-center  justify-around">
          <div className="lg:flex items-center">
            <div>
              <img src={png} alt="" className="w-48 rounded-full pic-width" />
            </div>
            <div className="ml-3 py-2 lg:py-0 text-left">
              <h2 className="text-2xl font-bold">
                Get items delivered on free
              </h2>
              <p className="w-96 text-width">
                Choose from the items and get free delivery to your doorstep.
                Order online and enjoy our products. If there is any problem
                with our product, Products will be replace for free.
              </p>
            </div>
          </div>
          <Link className="margin-button">
            <PrimaryButton>
              Shop Now{" "}
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                className="bg-black text-white rounded-full ml-3 "
              />
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
