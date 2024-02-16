import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Nav from "./customer/components/Navigation/Nav";
import { HomePage } from "./customer/Pages/HomePage/HomePage";
import { Fotter } from "./customer/components/FooterSection/Fotter";
import Navigation from "./customer/components/Navigation/Navigation";

import ProductDetails from "./customer/components/ProductDetails/ProductDetails";
import { Cart } from "./customer/components/Cart/Cart";
import Checkout from "./customer/components/Checkout/Checkout";
import Order from "./customer/components/Orders/Order";
import OrderDetails from "./customer/components/Orders/OrderDetails";
import CustomerRoutes from "./Routes/CustomerRoutes";
import { Route, Routes } from "react-router-dom";
import { Home } from "@mui/icons-material";

import PaymentPage from "./customer/components/DummyPayment/DummyPayment";
import AdminRoutes from "./Routes/AdminRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="hide-scrollbar">
        <Routes>
          <Route path="/*" element={<CustomerRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          {/* Page Not Found */}
        </Routes>
      </div>
    </>
  );
}

export default App;
