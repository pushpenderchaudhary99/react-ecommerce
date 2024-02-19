import { Skeleton } from "@mui/material";
import React from "react";

const CartSkeleton = () => {
  return (
    <div className="p-5 mb-5 shadow-lg border rounded-md">
      <div className="flex flex-row gap-5">
        <Skeleton variant="rectangular" width={90} height={90} />
        <div className="ml-5 space-y-1">
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={180} />
          <Skeleton variant="text" width={150} />
          <Skeleton variant="text" width={100} />
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <Skeleton variant="text" width={40} height={30} />
          <Skeleton variant="text" width={40} height={30} />
          <Skeleton variant="text" width={40} height={30} />
          <Skeleton variant="text" width={80} height={30} />
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
