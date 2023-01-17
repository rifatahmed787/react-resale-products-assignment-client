import React, { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useToken from "../../Hooks/useToken";
// import useToken from "../../Hooks/useToken";
import "./Login.css";

const Login = () => {
  const { SignIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    setError("");
    SignIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Successfully loged in");
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className="h-[600px] flex justify-center items-center">
      <div className="w-96 small-width bg-[#70c5b9] dark:bg-black dark:border p-7 shadow-lg rounded-md">
        <h2 className="text-xl text-center dark:text-white">Log in</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text dark:text-white">Email</span>
            </label>
            <input
              type="Email"
              {...register("email", { required: "Email Address is required" })}
              className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
            />
            {errors.email && (
              <p className="text-red-600" role="alert">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text dark:text-white">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters or more",
                },
              })}
              className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
            />
            <label className="label">
              <span className="label-text dark:text-white">
                Forget Password?
              </span>
            </label>
            {errors.password && (
              <p className="text-red-600" role="alert">
                {errors.password?.message}
              </p>
            )}
          </div>
          <input
            className="btn bg-[#70c5b9] hover:bg-[#70c5b9]  text-black w-full mt-5"
            value="Log in"
            type="submit"
          />
          <div>{setError && <p className="text-red-600">{error}</p>}</div>
        </form>
        <p className="mt-5 dark:text-white">
          New to Laptop Resale{" "}
          <Link className="text-black dark:text-primary link" to="/signup">
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
