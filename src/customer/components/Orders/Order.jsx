import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../States/Orders/Action";
import { useNavigate } from "react-router-dom";

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
