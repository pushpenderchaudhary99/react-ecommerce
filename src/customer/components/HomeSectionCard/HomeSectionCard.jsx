import React from "react";
import { useNavigate } from "react-router-dom";

export const HomeSectionCard = (props) => {
  const navigate = useNavigate();
  const handelCarouselItemClick = () => {
    navigate(`/product/${props.data?.id || undefined}`);
  };
  return (
    <div
      onClick={handelCarouselItemClick}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] h-[20rem] mx-3 pt-5"
    >
      <div className="h-[12rem] w-[10rem]">
        <img
          src={props.data?.imageUrl}
          alt=""
          className="object-cover object-top w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">
          {props.data?.brand}
        </h3>
        <p className="mt-2 text-sm text-gray-500">{props.data?.title}</p>
      </div>
    </div>
  );
};
