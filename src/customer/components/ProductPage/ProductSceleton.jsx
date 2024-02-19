import { Skeleton } from "@mui/material";
import React from "react";

const ProductSceleton = () => {
  return (
    <div className="p-5">
      <Skeleton
        variant="rounded"
        width={200}
        height={300}
        sx={{ bgcolor: "grey.200" }}
      />
      <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={150} />
      <Skeleton
        variant="text"
        sx={{ fontSize: ".8rem", bgcolor: "grey.200" }}
        width={200}
      />
      <Skeleton
        variant="text"
        sx={{ fontSize: ".8rem", bgcolor: "grey.200" }}
        width={200}
      />
    </div>
  );
};

export default ProductSceleton;
