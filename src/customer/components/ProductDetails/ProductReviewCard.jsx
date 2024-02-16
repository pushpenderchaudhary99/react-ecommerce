import { Avatar, Box, Grid, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ratingsApi,
  ratingsApiWithoutAuth,
  reviewApi,
} from "../../../configuration/ApiConfig";

export const ProductReviewCard = ({ reviewItem, productId }) => {
  const [rating, setRating] = useState(null);
  const [ratingVal, setRatingVal] = useState(0);
  const formatDate = (dateString) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return ` ${month} ${day}, ${year}`;
  };
  const getRatingByUser = async (productId, userId) => {
    try {
      const { data } = await ratingsApiWithoutAuth.get(
        `/api/ratings/rating/${productId}/${userId}`
      );
      if (data) setRating(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getRatingByUser(productId, reviewItem?.user?.id);
  }, [reviewItem]);
  useEffect(() => {
    setRatingVal(rating?.rating);
  }, [rating, rating?.rating]);
  return (
    <div>
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
            >
              {reviewItem?.user?.firstName[0]}
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg w-full ">
                {" "}
                {reviewItem?.user?.firstName} {reviewItem?.user?.lastName}{" "}
              </p>

              <p className="opacity-70">{formatDate(reviewItem?.createdAt)}</p>
            </div>
          </div>
          <Rating value={ratingVal} name="half-rating-read" readOnly />
          <p className="w-[30rem]">{reviewItem?.review} </p>
        </Grid>
      </Grid>
    </div>
  );
};
