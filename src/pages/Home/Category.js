import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthProvider";
import Loading from "../shared/Loading";
import "./Category.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    fetch(
      "https://react-assignment-resale-products-server.vercel.app/categories"
    )
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mt-5 margin-left lg:pl-10">
        Browse items by category
      </h3>
      <div className="lg:flex justify-center mx-auto sm:py-14 lg:py-20 ">
        {categories.map((category) => (
          <div key={category._id}>
            <Link to={`/products/${category.category_id}`}>
              <div className="card w-80 h-64 my-5 mx-auto  mr-10 margin-right transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-base-100 shadow-2xl image-full hover:bg-slate-400">
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
