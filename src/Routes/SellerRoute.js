import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useSeller from "../Hooks/useSeller";
import Loading from "../pages/shared/Loading";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);

  const location = useLocation();

  if (loading || isSellerLoading) {
    return <Loading></Loading>;
  }

  if (user && user?.uid && isSeller) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
