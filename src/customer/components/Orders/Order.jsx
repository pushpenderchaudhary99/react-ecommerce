import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../States/Orders/Action";
import { useNavigate } from "react-router-dom";
import LocalShipping from "@mui/icons-material/LocalShipping";
import OrderCardSkeleton from "./Skeletons/OrderCardSkeleton";

const Order = () => {
  const order_status = [
    { label: "One The Way", value: "on_the_way" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Returned", value: "returned" },
  ];
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("AUTH.jwt in orderHistory", auth?.jwt);
    if (jwt) dispatch(getOrderHistory());
  }, [jwt, auth?.jwt]);
  const handelOrderClick = (orderId) => {
    navigate(`/account/order/${orderId}`);
  };
  return (
    <div className="px:5 lg:px-20">
      <Grid container sx={{ justifyContent: "space-between" }}>
        {/* Fitler Options */}
        <Grid item xs={2.5}>
          <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold uppercase">Order Status</h1>
              {order_status.map((option) => (
                <div className="flex items-center ">
                  <input
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    defaultValue={option.value}
                    type="checkbox"
                  />
                  <label
                    className="ml-3 text-sm text-gray-600"
                    htmlFor={option.value}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        {/* Orders */}
        <Grid item xs={9}>
          <div className="space-y-5">
            {/* Loading Skeleton */}
            {order?.loading &&
              [1, 2, 3, 4].map((key) => <OrderCardSkeleton key={key} />)}
            {/* NO Order Placed */}
            {order?.orders?.length === 0 && (
              <div className="flex flex-col h-[30rem]  w-full">
                <div className="flex items-center justify-center mt-[10rem]">
                  <LocalShipping
                    className="text-6xl text-gray-400 "
                    sx={{ fontSize: 48 }}
                  />
                </div>
                <div className="flex flex-col items-center justify-center  text-gray-400">
                  <div className="text-xl font-semibold mb-2">
                    No Orders to Display
                  </div>
                  <div className="text-lg">
                    It looks like you haven't placed any orders yet.
                  </div>
                </div>
              </div>
            )}
            {/* Order History */}
            {order.orders?.map((item) => (
              <div
                onClick={() => handelOrderClick(item.id)}
                className="border rounded shadow-lg space-y-2 bg-slate-300 pb-2"
              >
                <span className=" flex justify-between ml-5 mr-20 mt-2 font-semibold  text-white">
                  <span>Order Id : {item.id} </span>
                  {/* <span className="">Total : {item.totalDiscountedPrice}</span> */}
                </span>

                {item.orderItems.map((orderItem) => (
                  <OrderCard key={orderItem.id} order={item} item={orderItem} />
                ))}
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
