import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import RatingReviewCard from "./RatingReviewCard";

const OrderRatingReviewModal = ({ open, handleClose, product }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
  };
  const backdropStyle = {
    //zIndex: 1000, // Ensure the backdrop is above other elements
    //backgroundColor: "rgba(0, 0, 0, 0.5)", // Increase darkness by adjusting alpha value
    //filter: "url(#blur)",
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(52, 52, 52, 0.1)",
            },
          },
        }}
        style={{
          // Set z-index to ensure it appears at the top
          zIndex: 999,
        }}
      >
        <Box sx={style}>
          <RatingReviewCard product={product} handelClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default OrderRatingReviewModal;
