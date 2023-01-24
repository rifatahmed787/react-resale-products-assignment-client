import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import Loading from "../../shared/Loading";

const AllUsers = () => {
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://react-assignment-resale-products-server.vercel.app/users"
      );
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id) => {
    fetch(
      `https://react-assignment-resale-products-server.vercel.app/users/admin/${id}`,
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
          toast.success("Admin made successfully");
          refetch();
        }
      });
  };

  const handleDelete = (user) => {
    fetch(
      `https://react-assignment-resale-products-server.vercel.app/users/${user._id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("User deleted successfully");
        }
      });
  };

  const handleVerified = (id) => {
    fetch(
      `https://react-assignment-resale-products-server.vercel.app/users/verify/${id}`,
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
          toast.success("User verified successfully");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h3 className="text-3xl mb-6 mt-5 ml-3 font-semibold dark:text-white text-center">
        All Users
      </h3>
      <div className="overflow-x-auto mx-3">
        <table className="table w-full ">
          <thead className="">
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Verified</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.type}</td>
                <td>
                  {user?.verified ? (
                    <p>verified</p>
                  ) : (
                    <button onClick={() => handleVerified(user._id)}>
                      <Icon
                        icon="uil:comment-verify"
                        width="32"
                        className="text-blue-500"
                      />
                    </button>
                  )}
                </td>
                <td>
                  {user?.role !== "admin" ? (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-xs btn-primary"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <Icon
                      icon="material-symbols:cloud-done"
                      width="32"
                      className="text-green-500"
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(user)} className="">
                    <Icon
                      icon="material-symbols:delete-forever"
                      width="30"
                      className="text-red-700"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
