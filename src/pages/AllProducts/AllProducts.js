import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AllProductsDetails from "./AllProductsDetails";
import BookingModal from "./BookingModal";

const AllProducts = () => {
  const products = useLoaderData();
  const [serviceModal, setServiceModal] = useState(null);

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-5 lg:mx-3">
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
