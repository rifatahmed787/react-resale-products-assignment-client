import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import useBuyer from "../Hooks/useBuyer";
import useSeller from "../Hooks/useSeller";
import Footer from "../pages/shared/Footer";
import Navbar from "../pages/shared/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  console.log(user);
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile dark:bg-[#020e0b]">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-[#149777] dark:bg-[#08221c] text-base-content">
            <li>
              <Link to="/dashboard" />
            </li>
            {isBuyer && (
              <>
                <li className="mb-3 text-white">
                  <Link to="/dashboard/myorders">My Order</Link>
                </li>
              </>
            )}
            {isSeller && (
              <>
                <li className="mb-3 text-white">
                  <Link to="/dashboard/addproducts">Add Product</Link>
                </li>
                <li className="mb-3 text-white">
                  <Link to="/dashboard/myproduct">My Product</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li className="mb-3 text-white">
                  <Link to="/dashboard/allusers">All Users</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
