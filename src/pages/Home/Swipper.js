import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "./Swipper.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useQuery } from "@tanstack/react-query";

const Swipper = () => {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        "https://react-assignment-resale-products-server.vercel.app/products"
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="py-5  lg:h-96 md:72 custom-height">
      <Swiper
        slidesPerView={3}
        spaceBetween={15}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="w-80 h-64 custom-width">
              <img src={product.img} alt="" />
              <h2 className="mt-1">{product.name}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swipper;
