import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loading from "../../shared/Loading";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const booking = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-[#149777] text-center py-5 text-3xl font-semibold font-serif">
        Payment for {booking.product}
      </h2>
      <p className="text-center dark:text-white">
        Please pay {booking.price} tk for your booking {booking.product}.
      </p>
      <div className="card  w-1/3 my-12 mx-auto">
        <Elements stripe={stripePromise}>
          <CheckOutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
