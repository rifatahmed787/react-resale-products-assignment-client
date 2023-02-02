import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import png from "../../../assets/image/cloud-upload-regular-240.png";
import "./AddProducts.css";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [fileList, setFileList] = useState();
  const [preview, setPreview] = useState();
  const navigate = useNavigate();

  console.log(fileList);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const imageHostKey = process.env.REACT_APP_imagebb_key;
  // console.log(imageHostKey);

  useEffect(() => {
    if (!fileList) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(fileList);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [fileList]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFileList(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setFileList(e.target.files[0]);
  };

  //remove selected image
  const removeSelectedImage = () => {
    setFileList();
  };

  const handleAddProduct = (data) => {
    const img = fileList;
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "jujslbiy");

    // const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    const url = "https://api.cloudinary.com/v1_1/dztlowlu0/image/upload";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        // console.log(imgData);
        if (imgData.asset_id) {
          const products = {
            img: imgData.url,
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
                navigate("/dashboard/myproduct");
              }
            });
        }
      });
  };

  return (
    <div className="my-10">
      <div className="lg:w-9/12 md:w-9/12 sm:w-11/12 small-width p-7 shadow-lg rounded-md mx-auto bg-[#70c5b9] dark:bg-black ">
        <h2 className="text-3xl mb-6 ml-3 text-center dark:text-white">
          Add Product
        </h2>
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <div className="lg:flex justify-center">
            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text dark:text-white">Seller Name</span>
              </label>
              <input
                type="text"
                {...register("sellerName", { required: "Name is required" })}
                className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
              />
            </div>
            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text dark:text-white">Product Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
              />
            </div>
          </div>
          <div className="lg:flex justify-center">
            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text dark:text-white">Location</span>
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
              />
            </div>
            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text dark:text-white">
                  Original Price
                </span>
              </label>
              <input
                type="text"
                {...register("originalPrice", {
                  required: "Original Price is required",
                })}
                className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
              />
            </div>
          </div>
          <div className="lg:flex justify-center">
            <div className="form-control w-full max-w-xs mx-auto">
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
            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text dark:text-white">
                  Purchase year
                </span>
              </label>
              <input
                type="text"
                {...register("purchaseYear", {
                  required: "Purchase year is required",
                })}
                className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
              />
            </div>
          </div>
          <div className="lg:flex justify-center">
            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text dark:text-white">Post Date</span>
              </label>
              <input
                type="text"
                {...register("postedDate", {
                  required: "Post date is required",
                })}
                className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
              />
            </div>
            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text dark:text-white">
                  Mobile number
                </span>
              </label>
              <input
                type="text"
                {...register("mobile", {
                  required: "Phone number is required",
                })}
                className="input input-bordered w-full max-w-xs dark:bg-black dark:text-white dark:border-white"
              />
            </div>
          </div>

          <div className="lg:flex justify-center">
            <div className="form-control w-full max-w-xs mx-auto">
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

            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text dark:text-white">
                  Upload image here
                </span>
              </label>
              {fileList ? (
                <>
                  <img src={preview} alt="/" className="w-32 h-32 mx-auto" />
                  <button onClick={removeSelectedImage}>
                    Remove This Image
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="file"
                    {...register("image", { required: "Image is required" })}
                    onChange={onSelectFile}
                    id="files"
                    className="hidden"
                  />
                  <label htmlFor="files">
                    <img src={png} alt="" className="block w-20 mx-auto" />
                  </label>
                </>
              )}
              {errors.email && (
                <p className="text-red-600" role="alert">
                  {errors.img?.message}
                </p>
              )}
            </div>
          </div>

          <div className="text-center">
            <input
              className="btn bg-[#70c5b9] hover:bg-[#70c5b9] max-w-xs text-black w-full mt-5"
              value="Add Product"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
