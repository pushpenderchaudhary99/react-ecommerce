import React, { useState, useRef, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { HomeSectionCard } from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";

const HomeSectionCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef();
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  // Ensure props.data is an array before calling map function
  const items = Array.isArray(props.data)
    ? props.data.map((item) => <HomeSectionCard key={item.id} data={item} />)
    : [];

  const slidePrev = () => {
    carouselRef.current.slidePrev();
    setActiveIndex(activeIndex - 1);
  };

  const slideNext = () => {
    carouselRef.current.slideNext();
    setActiveIndex(activeIndex + 1);
  };

  useEffect(() => {
    console.log("PROPS DATA IN HOME CAROUSE: ", props.data);
  }, [props.data]);

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  return (
    <div className="px-4 lg:px-8">
      <div className="relative p-5">
        <div className="m-5 ">
          <AliceCarousel
            items={items}
            disableButtonsControls
            infinite
            responsive={responsive}
            disableDotsControls
            onSlideChange={syncActiveIndex}
            activeIndex={activeIndex}
            ref={carouselRef}
          />
        </div>

        {activeIndex < items.length - 1 && (
          <button
            variant="contained"
            className="z-50 bg-gray-100 shadow-lg rounded-md w-[2.5rem] h-[5rem]"
            style={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "",
              color: "black",
            }}
            aria-label="next"
            onClick={slideNext}
          >
            <KeyboardArrowRightIcon style={{ fontSize: "2rem" }} />
          </button>
        )}
        {activeIndex !== 0 && (
          <button
            variant="contained"
            className="z-50 bg-gray-100 shadow-lg rounded-md w-[2.5rem] h-[5rem]"
            style={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "",
              color: "black",
            }}
            aria-label="prev"
            onClick={slidePrev}
          >
            <KeyboardArrowLeftIcon style={{ fontSize: "2rem" }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
