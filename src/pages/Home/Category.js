import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "../shared/Loading";
import "./Category.css";

const Category = () => {
  const {
    isLoading,
    isError,
    data: categories = [],
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        "https://react-assignment-resale-products-server.vercel.app/categories"
      );
      const data = await res.json();
      return data;
    },
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Loading></Loading>;
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-[#005C5A] dark:text-white mt-5 margin-left text-center">
        Browse items by category
      </h3>
      <div className="lg:flex justify-center mx-auto lg:space-x-16 sm:py-16 lg:py-16 ">
        {categories.map((category) => (
          <div key={category._id}>
            <Link to={`/products/${category.category_id}`}>
              <div className="card w-64 h-64 my-5 mx-auto  margin-right transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 shadow-2xl image-full">
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
