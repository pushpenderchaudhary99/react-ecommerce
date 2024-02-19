import { Grid, Skeleton } from "@mui/material";

const OrderDetailsSkeleton = () => {
  return (
    <div className="px:5 lg:px-20 ">
      {/* Delivary Address */}
      <div className="shadow-lg p-5 border">
        <h1 className="font-bold text-xl pb-5 ">
          <Skeleton variant="text" width={200} height={30} />
        </h1>
        <div className="px-10 opacity-70">
          <Skeleton variant="rectangular" width={500} height={150} />
        </div>
      </div>

      {/* Order Tracker */}
      <div className="py-20">
        <Skeleton variant="rectangular" width={1500} height={50} />
      </div>
      {/* Orders */}
      <Grid container className="space-y-5">
        {[...Array(3)].map((_, index) => (
          <Grid
            item
            container
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
            key={index}
          >
            {/* Product Details */}
            <Grid item xs={6}>
              <div className="flex items-center space-x-5">
                <Skeleton variant="rectangular" width={100} height={100} />
                <div className="space-y-2 ml-5">
                  <Skeleton variant="text" width={200} height={20} />
                  <Skeleton variant="text" width={150} height={15} />
                  <Skeleton variant="text" width={150} height={15} />
                  <Skeleton variant="text" width={150} height={15} />
                  <Skeleton variant="text" width={100} height={15} />
                </div>
              </div>
            </Grid>
            {/* To give Ratings */}
            <Grid item>
              <Skeleton variant="rectangular" width={150} height={50} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetailsSkeleton;
