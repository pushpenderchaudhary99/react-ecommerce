import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState();
  const handelOnClick = () => {};
  useEffect(() => {
    switch (order.orderStatus) {
      case "PLACED":
        setStatus("Order Placed");
        break;
      case "CONFIRMED":
        setStatus("Order Confirmed");
        break;
      case "SHIPPED":
        setStatus("Item Shipped");
        break;
      case "DELIVERED":
        setStatus("Item Delivred");
        break;
      case "RETURNED":
        setStatus("Item Returned");
        break;
      case "CANCELLED":
        setStatus("Order Cancelled");
        break;
    }
  }, []);
  const formatDate = (dateString) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month},${year}`;
  };
  return (
    <div className="p-5 border ml-2 mr-2 bg-white" onClick={handelOnClick}>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className="flex cursor-pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={item.product?.imageUrl}
            />
            <div className="ml-5 space-y-2">
              <p className="">{item.product?.title}</p>
              <p className="opacity-60 text-xs font-semibold">
                Size : {item.size}
              </p>
              <p className="opacity-60 text-xs font-semibold">
                Color : {item.product?.color}
              </p>
              <p className="opacity-60 text-xs font-semibold">
                Quantity : {item.quantity}
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={2} className=" flex items-center font-semibold">
          &#8377; {item.discountedPrice}
        </Grid>
        <Grid item xs={4} className="flex flex-col items-center">
          <LocalShippingIcon
            sx={{ width: "30px", height: "30px" }}
            className="text-green-600  text-sm mr-5"
          />
          <p>
            <span className="font-bold">
              {order.delivaryDate ? (
                <>Delivered on {formatDate(order.delivaryDate)}</>
              ) : (
                <>Expected by {formatDate(order.expectedDelivaryDate)}</>
              )}
            </span>
            <p className="">
              <span className="ml-12 text-gray-800">{status}</span>
            </p>
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
