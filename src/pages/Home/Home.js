import React from "react";
import TitleHook from "../../Hooks/TitleHook";
import AdvertiseProduct from "./AdvertiseProduct";

import Category from "./Category";
import Delivery from "./Delivery";
import Swipper from "./Swipper";

const Home = () => {
  TitleHook("Home");
  return (
    <div>
      <Swipper></Swipper>
      <Category></Category>
      <Delivery></Delivery>
      <AdvertiseProduct></AdvertiseProduct>
    </div>
  );
};

export default Home;
