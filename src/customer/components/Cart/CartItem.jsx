import { Button, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../States/Cart/Action";

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handelUpdateCartItem = (num) => {
    console.log("Cart ITEM UPDATE CALLED");
    const data = {
      data: {
        quantity: item.quantity + num,
      },
      cartItemId: item.id,
    };
    dispatch(updateCartItem(data));
  };
  const handelRemoveClick = () => {
    dispatch(removeCartItem(item));
  };
  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={item?.product?.imageUrl}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          {/* <p className="font-bold">NakedFeel</p> */}
          <p className="font-medium opacity-80 ">{item?.product?.title}</p>
          <p className="opacity-65">
            Size: {item?.size} , {item?.product?.color}
          </p>
          <p className="opacity-65 mt-2">Seller : {item?.product?.brand}</p>
          <div className="flex space-x-4 items-center text-gray-900 pt-4 ">
            <p className="font-semibold">{item?.discountedPrice}</p>
            <p className="opacity-50 line-through">{item?.price}</p>
            <p className="text-green-600 font-semibold">
              {item?.product?.discountPersent}% off
            </p>
          </div>
        </div>
      </div>
      {/* Buttons +- */}
      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={() => handelUpdateCartItem(-1)}
            disabled={item.quantity <= 1}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">{item?.quantity}</span>
          <IconButton
            onClick={() => handelUpdateCartItem(1)}
            sx={{ color: "RGB(145 85 253)" }}
          >
            <AddCircleOutlineIcon />
          </IconButton>

          <div>
            <Button
              onClick={handelRemoveClick}
              sx={{ color: "RGB(145 85 253)" }}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
