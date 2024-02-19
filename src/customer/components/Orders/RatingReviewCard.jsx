import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  Avatar,
  Box,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Send } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { rateAndReviewProduct } from "../../../States/RatingAndReview/Action";

const ReviewCard = ({ product, handelClose }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { ratingAndReview } = useSelector((store) => store);

  const handleReviewSubmit = () => {
    // Here you can handle the submission of review text and rating
    // For example, you can store them in state variables or make an API call to save them
    if (!reviewText || rating === 0) {
      alert("Please provide both rating and review text.");
      return;
    }
    console.log("Review Text:", reviewText);
    console.log("Rating:", rating);
    const data = {
      rating: { productId: product?.product?.id, rating: rating },
      review: { productId: product?.product?.id, review: reviewText },
    };
    dispatch(rateAndReviewProduct(data));
    handelClose();
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="shadow-md">
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="mr-4 ">
              <img
                className="w-[4rem] h-[4rem] object-cover object-top rounded-md"
                src={product?.product?.imageUrl}
                alt="product image"
              />
            </div>

            <div>
              {console.log("product in review card ", product)}
              <Typography variant="h6" component="h2">
                {product?.product?.brand}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product?.product?.title}
              </Typography>
            </div>
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            rows={4}
          />
          <div className="flex items-center mb-4 gap-4">
            <Typography variant="body1" color="text.secondary" className="ml-2">
              Select Rating
            </Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
          <div className="flex justify-end mr-5">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Send />}
              onClick={handleReviewSubmit}
              disabled={ratingAndReview?.loading}
            >
              Submit Review
            </Button>
          </div>
        </CardContent>
        <div className="w-full p-2 ">
          {ratingAndReview?.loading && <LinearProgress />}
        </div>
      </Card>
    </div>
  );
};

export default ReviewCard;
