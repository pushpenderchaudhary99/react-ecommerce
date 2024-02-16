import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../admin/components/Admin";
import { Box } from "@mui/material";
import PageNotFount from "../customer/Pages/PageNotFount";
import ProtectedRoutes from "./ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../States/Auth/Action";

const AdminRoutes = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (jwt) {
      console.log("CALLING DISPATCH");
      dispatch(getUser(jwt));
    }
  }, [jwt]);
  useEffect(() => {
    setLoading(auth.loading);
  }, [auth]);
  return (
    <div>
      <Routes>
        {auth.loading && (
          <div className="flex w-full min-h-screen justify-center items-center text-center font-bold text-3xl text-gray-500">
            Loading...
          </div>
        )}
        {auth.user && (
          <Route
            path="/*"
            element={
              <ProtectedRoutes feed={auth.user}>
                <Admin />
              </ProtectedRoutes>
            }
          ></Route>
        )}

        {/* Page Not Found */}
        <Route path="*" element={<PageNotFount />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
