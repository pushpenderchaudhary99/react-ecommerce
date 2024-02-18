import React from "react";
import { HomePage } from "../customer/Pages/HomePage/HomePage";
import { Cart } from "../customer/components/Cart/Cart";
import { Route, Routes } from "react-router-dom";
import { ProductsPage } from "../customer/components/ProductPage/ProductsPage";
import Navigation from "../customer/components/Navigation/Navigation";
import { Fotter } from "../customer/components/FooterSection/Fotter";
import ProductDetails from "../customer/components/ProductDetails/ProductDetails";
import Checkout from "../customer/components/Checkout/Checkout";
import Order from "../customer/components/Orders/Order";
import OrderDetails from "../customer/components/Orders/OrderDetails";
import PaymentPage from "../customer/components/DummyPayment/DummyPayment";
import PageNotFount from "../customer/Pages/PageNotFount";
import { ProductsSearchPage } from "../customer/components/ProductPage/ProductsSearchPage";
const CustomerRoutes = () => {
  return (
    <>
      <div>
        <div>
          <Navigation />
        </div>
        <Routes>
          <Route path="/login" element={<HomePage />} />
          <Route path="/register" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/:levelOne/:levelTwo/:levelThree"
            element={<ProductsPage />}
          />
          <Route path="/products/search" element={<ProductsSearchPage />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account/order" element={<Order />} />
          <Route path="/account/order/:orderId" element={<OrderDetails />} />

          {/* Dummy Payment link : use actual gateway instad */}
          <Route path="/pay" element={<PaymentPage />} />

          {/* Page Not Found
          <Route path="*" element={<PageNotFount />} /> */}
        </Routes>
      </div>
      <div>
        <Fotter />
      </div>
    </>
  );
};

export default CustomerRoutes;
