import React from "react";
import "./productcard.css";
import { useNavigate } from "react-router-dom";

export const ProductCard = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="productCard w-[15rem] m-3 transition-all cursor-pointer"
        onClick={() => navigate(`/product/${props.product.id}`)}
      >
        <div className="h-[20rem]">
          <img
            className="h-full w-full object-cover object-left-top"
            src={props.product.imageUrl}
            alt=""
          />
        </div>
        <div className="textPart bg-white p-3">
          <div>
            <p className="font-bold opacity-60">{props.product.brand}</p>
            <p className="">{props.product.title}</p>
          </div>
          <div className="flex items-center space-x-2">
            {/* Disounted Price */}
            <p className="font-semibold">{props.product.discountedPrice}</p>
            {/* Original Price */}
            <p className="line-through opacity-50">{props.product.price}</p>
            {/* Disount % */}
            <p className="text-green-600 font-semibold">
              {props.product.discountPersent}% off
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
