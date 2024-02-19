import React, { useEffect, useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTraker from "./OrderTraker";
import { Box, Button, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../States/Orders/Action";
import { PAYMENT_RESET } from "../../../States/Payment/ActionType";
import OrderRatingReviewModal from "./OrderRatingReviewModal";
import OrderDetailsSkeleton from "./Skeletons/OrderDetailsSkeleton";

const OrderDetails = () => {
  const { payment } = useSelector((state) => state);
  const { order } = useSelector((state) => state);
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(false);
  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(" useeffect called");
    dispatch(getOrderById({ orderId: param.orderId }));

    setTimeout(() => {
      console.log("ACTIVE STEP:", activeStep);
      dispatch({ type: PAYMENT_RESET });
    }, [20000]);
  }, []);
  useEffect(() => {
    switch (order.order?.orderStatus) {
      case "PENDING":
        setActiveStep(0);
        break;
      case "PLACED":
        setActiveStep(1);
        break;
      case "CONFIRMED":
        setActiveStep(2);
        break;
      case "SHIPPED":
        setActiveStep(3);
        break;
      case "DELIVERED":
        setActiveStep(5);
        break;
      default:
        setActiveStep(0);
    }
  }, [order?.order]);

  const handelRatingReviewButton = (product) => {
    setOpen(true);
    setProduct(product);
  };
  const handelClose = () => {
    setOpen(false);
  };

  return (
    <>
      {order?.loading ? (
        <OrderDetailsSkeleton />
      ) : (
        <>
          <div className="px:5 lg:px-20 ">
            {/* Rating & Review Modal */}
            <OrderRatingReviewModal
              handleClose={handelClose}
              open={open}
              product={product}
            />
            {/* Payment Sucessful */}
            {payment.paymentSucess && (
              <>
                <div className="bg-green-600  h-[5rem] flex justify-center items-center mb-5 ml-100">
                  <p className="text-white text-center">
                    <p className="font-bold text-xl mb-2">Payment Successful</p>
                    Your order has been placed
                  </p>
                </div>
              </>
            )}
            {/* Delivary Address */}
            <div className="shadow-lg p-5 border">
              <h1 className="font-bold text-xl pb-5 ">Delivary Address</h1>
              <div className="px-10 opacity-70">
                <AddressCard address={order.order?.shippingAddress} />
              </div>
            </div>

            {/* Order Tracker */}
            <div className="py-20">
              <OrderTraker activeStep={activeStep} />
            </div>
            {/* Orders */}
            <Grid container className="space-y-5">
              {order.order?.orderItems?.map((item) => (
                <Grid
                  item
                  container
                  className="shadow-xl rounded-md p-5 border"
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
                  key={item.id}
                >
                  {/* Product Details */}
                  <Grid item xs={6}>
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
                        <p className="text-sm font-semibold">
                          {" "}
                          &#8377;{item.discountedPrice}
                        </p>
                      </div>
                    </div>
                  </Grid>
                  {/* To give Ratings */}
                  <Grid item>
                    <Button
                      sx={{ color: deepPurple[500] }}
                      disabled={
                        order?.order?.orderStatus === "DELIVERED" ? false : true
                      }
                      onClick={() => handelRatingReviewButton(item)}
                    >
                      <StarBorderIcon
                        sx={{ fontSize: "2rem" }}
                        className="px-2 "
                      />
                      <span>Rate & Review Product</span>
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
