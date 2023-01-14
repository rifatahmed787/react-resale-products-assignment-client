import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const { SignOut, user } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const themeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogOut = () => {
    SignOut()
      .then(() => {
        toast.success("Successfully loged out");
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };

  const menuItems = (
    <React.Fragment>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>

      {user?.uid ? (
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li
            className="btn btn-ghost normal-case text-base flex items-center navber-left"
            onClick={handleLogOut}
          >
            Log out
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </>
      )}
    </React.Fragment>
  );

  return (
    <div className="navbar bg-[#149777] dark:bg-[#08221c]">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost rounded-md lg:hidden dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 dark:bg-[#149777] dark:text-white"
          >
            {menuItems}
            <div className="pl-3 ">
              <button onClick={themeToggle}>
                {theme === "light" ? (
                  <Icon icon="mingcute:sun-line" width="32" />
                ) : (
                  <Icon icon="ph:moon-fill" width="32" className="text-black" />
                )}
              </button>
            </div>
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-[#EEE] rounded-md normal-case text-xl"
        >
          <Icon
            className="mr-2"
            icon="ic:outline-laptop-mac"
            color="#EEE"
            width="32"
            height="32"
          />
          Laptop Resale
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0 text-[#EEE]">{menuItems}</ul>
        <div className="flex items-center mr-5">
          <button onClick={themeToggle}>
            {theme === "light" ? (
              <Icon
                icon="mingcute:sun-line"
                width="32"
                className="text-white"
              />
            ) : (
              <Icon icon="ph:moon-fill" width="32" className="text-gray-500" />
            )}
          </button>
        </div>
      </div>
      <label
        htmlFor="dashboard-drawer"
        className="btn btn-primary drawer-button btn-xs ml-20 rounded-md lg:hidden dark:text-white"
      >
        Open drawer
      </label>
    </div>
  );
};

export default Navbar;
