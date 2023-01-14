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
    return <Loading></Loading>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mt-5 margin-left lg:pl-10 dark:text-white">
        Browse items by category
      </h3>
      <div className="lg:flex justify-center mx-auto lg:space-x-7 sm:py-14 lg:py-20 ">
        {categories.map((category) => (
          <div key={category._id}>
            <Link to={`/products/${category.category_id}`}>
              <div className="card w-64 h-64 my-5 mx-auto  margin-right transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-base-100 shadow-2xl image-full hover:bg-slate-400">
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
