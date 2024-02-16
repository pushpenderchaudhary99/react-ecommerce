import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { mainCarouselData } from "./mainCarouselData";
const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};
export const MainCarousel = () => {
  const items = mainCarouselData.map((item) => (
    <img className="cursor-pointer" role="presentation" src={item.image} />
  ));
  return (
    <>
      <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={5000}
        infinite
      />
    </>
  );
};
export default MainCarousel;
