import React, { useEffect } from "react";
import { CartItem } from "./CartItem";
import { Button, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../States/Cart/Action";
import { ShoppingCart } from "@mui/icons-material";
import Swal from "sweetalert2";
import CartSkeleton from "./CartSkeleton";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const handelCheckoutClick = () => {
    if (cart.cart?.cartItems?.length === 0)
      Swal.fire("Empty Cart!", "Please add items before checkout", "info");
    else {
      if (jwt) {
        navigate("/checkout?step=2");
      } else navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(getCart());
  }, [cart.removedCartItem, cart.updatedCartItem]);
  useEffect(() => {}, [cart.cart]);
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          {/* Loading Cart */}
          {cart?.loading &&
            [1, 2, 3].map((item) => <CartSkeleton key={item} />)}
          {/* Empty Cart */}
          {!cart?.cart ||
            (cart.cart?.cartItems?.length === 0 && (
              <>
                <div className="flex flex-col h-[30rem] border rounded-lg shadow-md">
                  <div className="flex items-center justify-center mt-[10rem]">
                    <ShoppingCart
                      className="text-6xl text-gray-400 "
                      sx={{ fontSize: 48 }}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center  text-gray-400">
                    <div className="font-bold text-2xl mb-3">Cart Empty</div>
                    <div className="text-lg ">Add items to cart</div>
                  </div>
                </div>
              </>
            ))}
          {/* Cart with items */}
          {cart.cart?.cartItems?.map((item) => (
            <CartItem item={item} />
          ))}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
          <div className="border px-5 py-5">
            <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
            <hr />
            <div className="space-y-3 font-semibold mb-10">
              <div className="flex justify-between pt-3 text-black  ">
                <span>Price</span>
                <span>
                  {cart.cart?.totalPrice ? (
                    cart.cart?.totalPrice
                  ) : cart?.loading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={50}
                    />
                  ) : (
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Discount</span>
                <span className=" text-green-600 ">
                  {cart.cart?.discounte ? (
                    cart.cart?.discounte
                  ) : cart?.loading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={50}
                    />
                  ) : (
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Delivary Charges</span>
                <span className=" text-green-600 ">
                  {cart?.loading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={50}
                    />
                  ) : (
                    "FREE"
                  )}
                </span>
              </div>
              <hr></hr>
              <div className="flex justify-between pt-5 font-bold ">
                <span>Total Amount</span>
                <span className="text-green-600">
                  {cart.cart?.totalDiscountedPrice ? (
                    cart.cart?.totalDiscountedPrice
                  ) : cart?.loading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={50}
                    />
                  ) : (
                    0
                  )}
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
              onClick={handelCheckoutClick}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
