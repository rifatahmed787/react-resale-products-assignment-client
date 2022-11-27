import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const url = `http://localhost:5000/booking?email=${user?.email}`;
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
  return (
    <div>
      {bookings.length > 0 && bookings.map((booking) => console.log(booking))}
    </div>
  );
};

export default MyOrders;
