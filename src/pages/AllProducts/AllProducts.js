import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AllProductsDetails from "./AllProductsDetails";
import BookingModal from "./BookingModal";
import "./AllProducts.css";

const AllProducts = () => {
  const products = useLoaderData();
  const [serviceModal, setServiceModal] = useState(null);

  return (
    <section>
      <div className="text-center py-7">
        {products.length > 1 ? (
          <h1 className="text-2xl font-semibold text-[#005C5A]">
            Total {products.length} products are avalilable.
          </h1>
        ) : (
          <h1 className="text-2xl font-semibold text-[#005C5A]">
            Total {products.length} product is avalilable.
          </h1>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 px-5 gap-x-7 lg:mx-4 md:mx-5 sm-width dark:text-white">
        {products.map((product) => (
          <AllProductsDetails
            key={product._id}
            product={product}
            setServiceModal={setServiceModal}
          ></AllProductsDetails>
        ))}
      </div>
      <div>
        {serviceModal && (
          <BookingModal
            serviceModal={serviceModal}
            setServiceModal={setServiceModal}
          ></BookingModal>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
