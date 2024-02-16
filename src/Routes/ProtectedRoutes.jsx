import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Unauthorized from "../customer/Pages/Unauthorized";

export default function ProtectedRoutes({ feed, children }) {
  const [canShow, setCanShow] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    console.log("STATE IN PROTECTED ROUTES", feed);
    console.log("ROLE IN PROTECTED ROUTES", feed?.role);
    console.log("updating can show");
    if (feed?.role === "ADMIN") {
      setCanShow(true);
    } else {
      setRedirect(true);
    }
    console.log("updated can show", canShow);
  }, []); // Only re-run the effect if `feed` changes

  if (redirect) {
    console.log("exiting to 404");
    return <Unauthorized />;
  }

  return canShow ? children : null;
}
