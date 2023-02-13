import React, { useContext } from "react";

import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import useBuyer from "../Hooks/useBuyer";
import useSeller from "../Hooks/useSeller";
import Navbar from "../pages/shared/Navbar";
import png from "../assets/image/User_Avatar_2.png";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  const [isBuyer] = useBuyer(user?.email);

  return (
    <div className="dark:bg-[#020e0b]">
      <div>
        <Navbar></Navbar>
      </div>
      <div className="drawer drawer-mobile ">
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
              {user?.photoURL ? (
                <Link to="/dashboard">
                  <div className="">
                    <img
                      src={user?.photoURL}
                      alt=""
                      className="w-16 h-16 mx-auto rounded-full dark:bg-gray-500 aspect-square"
                    />
                  </div>
                  <h3 className="text-lg dark:text-white">
                    {user?.displayName}
                  </h3>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <div className="">
                    <img
                      src={png}
                      alt=""
                      className="w-16 h-16 mx-auto rounded-full dark:bg-gray-500 aspect-square"
                    />
                  </div>
                  <h3 className="text-lg dark:text-white">
                    {user?.displayName}
                  </h3>
                </Link>
              )}
            </li>
            {isBuyer && (
              <>
                <li
                  className={`font-semibold text-white ${
                    location.pathname === "/dashboard/myorders"
                      ? "border-b-2 border-black dark:border-green-300"
                      : ""
                  }`}
                >
                  <Link to="/dashboard/myorders">My order</Link>
                </li>
              </>
            )}
            {isSeller && (
              <>
                <li
                  className={`font-semibold text-white ${
                    location.pathname === "/dashboard/addproducts"
                      ? "border-b-2 border-black dark:border-green-300"
                      : ""
                  }`}
                >
                  <Link to="/dashboard/addproducts">Add product</Link>
                </li>
                <li
                  className={`font-semibold text-white ${
                    location.pathname === "/dashboard/myproduct"
                      ? "border-b-2 border-black dark:border-green-300"
                      : ""
                  }`}
                >
                  <Link to="/dashboard/myproduct">My product</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li
                  className={`font-semibold text-white ${
                    location.pathname === "/dashboard/allusers"
                      ? "border-b-2 border-black dark:border-green-300"
                      : ""
                  }`}
                >
                  <Link to="/dashboard/allusers">All users</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
