import { Grid, Skeleton } from "@mui/material";

const OrderCardSkeleton = () => {
  return (
    <div className="p-5 border ml-2 mr-2 bg-white">
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className="flex cursor-pointer">
            <Skeleton
              variant="rectangular"
              width={80}
              height={80}
              className="mr-5"
            />
            <div className="ml-5 space-y-2">
              <Skeleton variant="text" width={150} height={20} />
              <Skeleton variant="text" width={100} height={15} />
              <Skeleton variant="text" width={100} height={15} />
              <Skeleton variant="text" width={100} height={15} />
            </div>
          </div>
        </Grid>
        <Grid item xs={2} className="flex items-center font-semibold">
          <Skeleton variant="text" width={50} height={20} />
        </Grid>
        <Grid item xs={4} className="flex flex-col items-center">
          <Skeleton variant="circular" width={30} height={30} />
          <div>
            <Skeleton variant="text" width={150} height={20} />
            <Skeleton variant="text" width={100} height={15} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCardSkeleton;
