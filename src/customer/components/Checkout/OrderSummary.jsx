import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { CartItem } from "../Cart/CartItem";
import { Button, Grid } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../States/Orders/Action";
import { cartApi } from "../../../configuration/ApiConfig";
import { getCart } from "../../../States/Cart/Action";
const OrderSummary = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  useEffect(() => {
    if (orderId) dispatch(getOrderById({ orderId }));
  }, []);

  const handelPaymentClick = () => {
    console.log("Paymeny clickked");
    navigate(`/pay`);
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-md border">
        <AddressCard address={order.order?.shippingAddress} />
      </div>
      <div>
        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          <div className="col-span-2 mt-3">
            {order.order?.orderItems?.map((item) => (
              <Grid
                item
                container
                className="shadow-xl rounded-md p-5  border"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
                key={item.id}
              >
                {/* Product Details */}
                <Grid item xs={8}>
                  <div className="flex items-center space-x-5">
                    <img
                      className="w-[5rem] h-[5rem] object-cover object-top"
                      src={item.product?.imageUrl}
                      alt=""
                    />
                    <div className="space-y-2 ml-5">
                      <p className="font-semibold">{item.product?.title}</p>
                      <p className="space-x-5 opacity-50 text-xs font-semibold">
                        <span>Color :{item.product?.color}</span>{" "}
                        <span>Size : {item.size}</span>
                        <span>Quantity : {item.quantity}</span>
                      </p>
                      <p className="text-sm">Seller: {item.product?.brand}</p>
                      <p className="text-sm font-bold text-green-600">
                        {" "}
                        &#8377;{item.discountedPrice}
                        <span className="opacity-60 font-light line-through pl-4">
                          {item?.price}
                        </span>
                      </p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            ))}
          </div>
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-3 ">
            <div className="border px-5 py-5">
              <p className="uppercase font-bold opacity-60 pb-4">
                Price details
              </p>
              <hr />
              <div className="space-y-3 font-semibold mb-10">
                <div className="flex justify-between pt-3 text-black  ">
                  <span>Price</span>
                  <span>{order.order?.totalPrice}</span>
                </div>
                <div className="flex justify-between pt-3 ">
                  <span>Discount</span>
                  <span className=" text-green-600 ">
                    {order.order?.disount}
                  </span>
                </div>
                <div className="flex justify-between pt-3 ">
                  <span>Delivary Charges</span>
                  <span className=" text-green-600 ">Free</span>
                </div>
                <hr></hr>
                <div className="flex justify-between pt-5 font-bold ">
                  <span>Total Amount</span>
                  <span className=" text-green-600">
                    {order.order?.totalDiscountedPrice}
                  </span>
                </div>
              </div>
              <Button
                variant="contained"
                className="w-full mt-5"
                sx={{
                  px: "2.5rem",
                  py: ".7rem",
                  bgcolor: "#9155fd",
                  my: "1rem",
                }}
                onClick={handelPaymentClick}
              >
                Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
