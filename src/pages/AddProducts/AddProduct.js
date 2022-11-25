import React from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imageHostKey = process.env.REACT_APP_imagebb_key;

  const handleAddProduct = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const products = {
            image: imgData.data.url,
          };
          //        fetch("http://localhost:5000/doctors", {
          //     method: "POST",
          //     headers: {
          //       "content-type": "application/json",
          //       authorization: `bearer ${localStorage.getItem("accessToken")}`,
          //     },
          //     body: JSON.stringify(doctors),
          //   })
          //     .then((res) => res.json())
          //     .then((result) => {
          //       if (result.acknowledged) {
          //         toast.success(`${data.name} is added successfully`);
          //         navigate("/dashboard/managedoctors");
          //       }
          //     });
        }
      });
  };

  return (
    <div className="w-96 p-7 shadow-lg rounded-md mx-auto my-20">
      <h2 className="text-3xl mb-6 ml-3">Add a Doctor</h2>
      <form onSubmit={handleSubmit(handleAddProduct)}>
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
        {/* <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Specialty</span>
          </label>
          <select
            {...register("specialty")}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Select Specialty
            </option>
            {specialties.length &&
              specialties.map((specialty) => (
                <option key={specialty._id} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
          </select>
        </div> */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Attachment</span>
          </label>
          <input
            type="file"
            {...register("image", { required: "img is required" })}
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
          value="Add Doctor"
          type="submit"
        />
        {/* <div>{setError && <p className="text-red-600">{error}</p>}</div> */}
      </form>
    </div>
  );
};

export default AddProduct;
