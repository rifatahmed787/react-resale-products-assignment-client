import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";
import "./AddProducts.css";

const AddProduct = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imageHostKey = process.env.REACT_APP_imagebb_key;
  // console.log(imageHostKey);

  const handleAddProduct = (data) => {
    const img = data.image[0];
    const formData = new FormData();
    formData.append("image", img);

    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const products = {
            img: imgData.data.url,
            sellerName: data.sellerName,
            name: data.name,
            location: data.location,
            originalPrice: data.originalPrice,
            resalePrice: data.resalePrice,
            purchaseYear: data.purchaseYear,
            postedDate: data.postedDate,
            mobile: data.mobile,
            category_id: data.category_id,
            ad: false,
            email: user.email,
          };
          fetch(
            "https://react-assignment-resale-products-server.vercel.app/products",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify(products),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Product added successfully");
              }
            });
        }
      });
  };

  return (
    <div className="w-96 small-width p-7 shadow-lg rounded-md mx-auto bg-[#70c5b9] dark:bg-black my-20">
      <h2 className="text-3xl mb-6 ml-3 text-center dark:text-white">
        Add Product
      </h2>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text dark:text-white">Seller Name</span>
          </label>
          <input
            type="text"
            {...register("sellerName", { required: "Name is required" })}
            className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text dark:text-white">Product Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text dark:text-white">Location</span>
          </label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text dark:text-white">Original Price</span>
          </label>
          <input
            type="text"
            {...register("originalPrice", {
              required: "Original Price is required",
            })}
            className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text dark:text-white">Resale Price</span>
          </label>
          <input
            type="text"
            {...register("resalePrice", {
              required: "Resale price is required",
            })}
            className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text dark:text-white">Purchase year</span>
          </label>
          <input
            type="text"
            {...register("purchaseYear", {
              required: "Purchase year is required",
            })}
            className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text dark:text-white">Post Date</span>
          </label>
          <input
            type="text"
            {...register("postedDate", { required: "Post date is required" })}
            className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text dark:text-white">Mobile number</span>
          </label>
          <input
            type="text"
            {...register("mobile", { required: "Phone number is required" })}
            className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text dark:text-white">Category</span>
          </label>
          <select
            {...register("category_id")}
            className="select select-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
          >
            <option disabled selected>
              Select category
            </option>
            <option>macbook</option>
            <option>hp</option>
            <option>lenevo</option>
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text dark:text-white">Attachment</span>
          </label>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="px-3 py-12 border-2 border-dashed border-black rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
          />
          {errors.email && (
            <p className="text-red-600" role="alert">
              {errors.img?.message}
            </p>
          )}
        </div>

        <input
          className="btn bg-[#70c5b9] hover:bg-[#70c5b9]  text-black w-full mt-5"
          value="Add Product"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddProduct;
