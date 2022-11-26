import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";

const BookingModal = ({ serviceModal, setServiceModal }) => {
  const { user } = useContext(AuthContext);
  const { name: productName, resalePrice } = serviceModal;

  const handleBookingForm = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const location = form.location.value;
    console.log(name, phone, email, location);
    const BooikingData = {
      product: productName,
      name: name,
      price: resalePrice,
      email,
      phone,
    };
    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(BooikingData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setServiceModal(null);
          toast.success("Booking confirmed");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold mb-6">{productName}</h3>
          <form
            onSubmit={handleBookingForm}
            className="grid grid-cols-1 gap-6 py-3"
          >
            <input
              defaultValue={user?.displayName}
              name="name"
              type="text"
              placeholder="Full Name"
              className="input input-bordered input-md w-full"
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input input-bordered input-md w-full"
              required
            />
            <input
              defaultValue={user?.email}
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered input-md w-full"
            />
            <input
              type="text"
              name="location"
              placeholder="Your Location"
              className="input input-bordered input-md w-full"
              required
            />
            <input
              type="submit"
              value="Submit"
              className="btn  btn-primary bg-gradient-to-r from-primary to-secondary w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
