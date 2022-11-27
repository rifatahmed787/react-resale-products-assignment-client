import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "animate.css";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../shared/Loading";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mt-5 sm:ml-3 lg:pl-10">
        Browse items by category
      </h3>
      <div className="lg:flex justify-center mx-auto sm:py-14 lg:py-20 animate__animated animate__fadeIn">
        {categories.map((category) => (
          <div key={category._id}>
            <Link to={`/products/${category.category_id}`}>
              <div className="card w-80 h-64 my-5 mx-auto  mr-10 bg-base-100 shadow-2xl image-full hover:bg-slate-400">
                <figure>
                  <img src={category.img} alt="" className="" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title ">{category.name}</h2>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
