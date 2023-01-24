import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useToken from "../../Hooks/useToken";
import "./SignUp.css";

const SignUp = () => {
  const { SignUp, updateUser, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = (data) => {
    setError("");
    SignUp(data.email, data.password)
      .then((result) => {
        const user = result.user;
        toast.success("Signed up successfully");
        console.log(user);
        const userInfo = {
          displayName: data.name,
        };

        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email, data.type);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
    console.log(data);
  };

  const saveUser = (name, email, type) => {
    const user = { name, email, type, verified: false };
    fetch("https://react-assignment-resale-products-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
      });
  };

  //google sign up
  const handleGoogleSignUp = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Successfully signed up");
        googleUser(user.displayName, user.email);
      })
      .catch((error) => console.error(error));
  };
  const googleUser = (name, email) => {
    const googleUser = {
      name,
      email,
      type: "Buyer",
      verified: false,
    };
    fetch("https://react-assignment-resale-products-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(googleUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
      });
  };

  return (
    <div className="h-[800px]  flex justify-center items-center">
      <div className="w-96 small-width bg-[#70c5b9] dark:bg-black dark:border p-7 shadow-lg rounded-md">
        <h2 className="text-xl text-center dark:text-white">Sign up</h2>
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text dark:text-white">Name</span>
            </label>
            <input
              type="text"
              {...register("name")}
              className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
            />
          </div>
          <div className="form-control w-full max-w-xs dark:bg-black">
            <label className="label">
              <span className="label-text dark:text-white">Type</span>
            </label>
            <select
              {...register("type", { required: "Type is required" })}
              className="select select-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
            >
              <option disabled selected>
                <span className="dark:text-white">Select Type</span>
              </option>
              <option className="dark:text-white">Buyer</option>
              <option className="dark:text-white">Seller</option>
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text dark:text-white">Email</span>
            </label>
            <input
              type="Email"
              {...register("email", { required: "Email is required" })}
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
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                  message:
                    "Password must have a number and a special character",
                },
              })}
              className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
            />
            {errors.password && (
              <p className="text-red-600" role="alert">
                {errors.password?.message}
              </p>
            )}
          </div>
          <input
            className="btn bg-[#70c5b9] hover:bg-[#70c5b9]  text-black w-full mt-5"
            value="Sign up"
            type="submit"
          />
          <div>{setError && <p className="text-red-600">{error}</p>}</div>
        </form>
        <p className="mt-5 dark:text-white">
          Already have an account{" "}
          <Link className="text-black dark:text-primary link" to="/login">
            Please Log in
          </Link>
        </p>
        <div className="divider dark:text-white">OR</div>
        <button
          onClick={handleGoogleSignUp}
          className="btn btn-outline w-full hover:bg-[#70c5b9] dark:text-white"
        >
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignUp;
