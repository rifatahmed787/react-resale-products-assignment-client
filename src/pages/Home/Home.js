import React from "react";
import TitleHook from "../../Hooks/TitleHook";
import AdvertiseProduct from "./AdvertiseProduct";
import Banner from "./Banner";
import Category from "./Category";
import Delivery from "./Delivery";

const Home = () => {
  TitleHook("Home");
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <Delivery></Delivery>
      <AdvertiseProduct></AdvertiseProduct>
    </div>
  );
};

export default Home;
