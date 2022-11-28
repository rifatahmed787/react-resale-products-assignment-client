import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useToken from "../../Hooks/useToken";

const SignUp = () => {
  const { SignUp, updateUser, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();

  if (token) {
    navigate("/");
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
    const user = { name, email, type };
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
        console.log(data);
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7 shadow-lg rounded-md">
        <h2 className="text-xl text-center">Sign up</h2>
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <select
              {...register("type")}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Select Type
              </option>
              <option>Buyer</option>
              <option>Seller</option>
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="Email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600" role="alert">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
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
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-600" role="alert">
                {errors.password?.message}
              </p>
            )}
          </div>
          <input
            className="btn btn-accent w-full mt-5"
            value="Sign up"
            type="submit"
          />
          <div>{setError && <p className="text-red-600">{error}</p>}</div>
        </form>
        <p className="mt-5">
          Already have an account{" "}
          <Link className="text-primary" to="/login">
            Please Log in
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSignUp} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignUp;
