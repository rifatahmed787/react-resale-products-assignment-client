import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
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
          };
          console.log(products);
          fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(products),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Product added successfully");
                // navigate(`/products/${category.category_id}`);
              }
            });
        }
      });
  };

  return (
    <div className="w-96 p-7 shadow-lg rounded-md mx-auto my-20">
      <h2 className="text-3xl mb-6 ml-3">Add a Product</h2>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Seller Name</span>
          </label>
          <input
            type="text"
            {...register("sellerName")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            {...register("location")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Original Price</span>
          </label>
          <input
            type="text"
            {...register("originalPrice")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Resale Price</span>
          </label>
          <input
            type="text"
            {...register("resalePrice")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Purchase year</span>
          </label>
          <input
            type="text"
            {...register("purchaseYear")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Post Date</span>
          </label>
          <input
            type="text"
            {...register("postedDate")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Mobile number</span>
          </label>
          <input
            type="text"
            {...register("mobile")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            {...register("category_id")}
            className="select select-bordered w-full max-w-xs"
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
            <span className="label-text">Attachment</span>
          </label>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="px-3 py-12 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
          />
          {errors.email && (
            <p className="text-red-600" role="alert">
              {errors.img?.message}
            </p>
          )}
        </div>

        <input
          className="btn btn-accent w-full mt-5"
          value="Add Product"
          type="submit"
        />
        {/* <div>{setError && <p className="text-red-600">{error}</p>}</div> */}
      </form>
    </div>
  );
};

export default AddProduct;
