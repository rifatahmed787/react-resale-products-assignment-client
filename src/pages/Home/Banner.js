import React from "react";
import { Icon } from "@iconify/react";
import "./Category.css";

const Banner = () => {
  return (
    <div>
      <div className="pb-10  bg-[#149777] dark:bg-[#08221c] flex items-center justify-center">
        <div class="container  flex justify-center items-center px-4 sm:px-6 lg:px-8">
          <div class="relative">
            <input
              type="text"
              class="h-12 lg:w-96 sm:w-80 pr-8 pl-5 rounded-full z-0 focus:shadow focus:outline-none dark:bg-gray-600"
              placeholder="What are you looking for?"
            />
            <button class="absolute top-3 right-3">
              <Icon icon="ic:round-search" width="32" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
