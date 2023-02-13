import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import png from "../../../assets/image/User_Avatar_2.png";

const Welcome = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex justify-center items-center mt-16 px-5">
      <div className="flex flex-col sm:w-11/12 lg:w-1/2 bg-[#70C5B9] justify-center p-6 shadow-2xl rounded-xl sm:px-12 dark:bg-[#08221C] dark:text-gray-100">
        <h2 className="text-2xl text-center mb-5">Your profile</h2>
        {user?.photoURL ? (
          <>
            <img
              src={user?.photoURL}
              alt=""
              className="w-1/2 h-1/2 mx-auto rounded-full dark:bg-gray-500 aspect-square"
            />
            <div className="space-y-4 text-center divide-y divide-gray-700">
              <div className="my-2 space-y-1">
                <h2 className="text-3xl font-semibold sm:text-2xl">
                  {user?.displayName}
                </h2>
                <p className="px-5 text-xs sm:text-base dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <img
              src={png}
              alt=""
              className="w-1/2 h-1/2 mx-auto rounded-full dark:bg-gray-500 aspect-square"
            />
            <div className="space-y-4 text-center divide-y divide-gray-700">
              <div className="my-2 space-y-1">
                <h2 className="text-3xl font-semibold sm:text-2xl">
                  {user?.displayName}
                </h2>
                <p className="px-5 text-xs sm:text-base dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;
