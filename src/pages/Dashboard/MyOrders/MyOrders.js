import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";
import Loading from "../../shared/Loading";
import MyOrdersModal from "./MyOrdersModal";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [deletingOrder, setDeletingOrder] = useState(null);

  const url = `http://localhost:5000/booking?email=${user?.email}`;
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  //handling cancel deleting order
  const handleCancel = () => {
    setDeletingOrder(null);
  };

  //handle delete order
  const handleDeleteOrder = (order) => {
    fetch(`http://localhost:5000/booking/${order._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Order deleted successfully");
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h3 className="text-3xl mb-6 mt-5 ml-3">My Orders</h3>
      <div className="overflow-x-auto mx-3">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Index</th>
              <th>Product Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, i) => (
              <tr key={booking._id}>
                <th>{i + 1}</th>
                <td>{booking.product}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>
                  <label
                    onClick={() => setDeletingOrder(booking)}
                    htmlFor="orderdelete-modal"
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingOrder && (
        <MyOrdersModal
          title={`Are you sure want to delete order?`}
          handleDeleteOrder={handleDeleteOrder}
          modalData={deletingOrder}
          handleCancel={handleCancel}
        ></MyOrdersModal>
      )}
    </div>
  );
};

export default MyOrders;
