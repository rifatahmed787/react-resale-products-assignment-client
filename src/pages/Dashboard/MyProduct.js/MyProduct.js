import React from "react";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Loading from "../../shared/Loading";

const MyProduct = () => {
  const { user } = useContext(AuthContext);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `https://react-assignment-resale-products-server.vercel.app/product/${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleUpdate = (id) => {
    fetch(
      `https://react-assignment-resale-products-server.vercel.app/product/add/${id}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Ad made successfully");
          refetch();
        }
      });
  };

  const handleDelete = (id) => {
    fetch(
      `https://react-assignment-resale-products-server.vercel.app/product/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Product deleted successfully");
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h3 className="text-3xl mb-6 mt-5 ml-3 font-bold text-[#005C5A] text-center dark:text-white">
        My Product
      </h3>
      <div className="overflow-x-auto mx-3">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Index</th>
              <th>Product Name</th>
              {/* <th>Status</th> */}
              <th>Advertise</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>{product.name}</td>

                <td>
                  {product?.ad ? (
                    <p>Advertised</p>
                  ) : (
                    <button onClick={() => handleUpdate(product._id)}>
                      <Icon
                        icon="ri:advertisement-fill"
                        width="32"
                        className="text-green-500"
                      />
                    </button>
                  )}
                </td>
                <td>
                  <label
                    onClick={() => handleDelete(product._id)}
                    htmlFor="orderdelete-modal"
                    className="btn btn-outline btn-error btn-sm px-0"
                  >
                    <Icon
                      icon="material-symbols:delete-forever"
                      width="30"
                      className="text-red-700"
                    />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProduct;
