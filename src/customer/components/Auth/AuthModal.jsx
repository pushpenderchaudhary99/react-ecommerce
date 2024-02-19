import {
  Box,
  Fade,
  Modal,
  Typography,
  Backdrop,
  LinearProgress,
} from "@mui/material";
import React from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useLocation } from "react-router-dom";
import { Login } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { userApi } from "../../../configuration/ApiConfig";

const AuthModal = ({ handleClose, open }) => {
  const { auth } = useSelector((store) => store);
  const location = useLocation();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
  };
  const backdropStyle = {
    //zIndex: 1000, // Ensure the backdrop is above other elements
    //backgroundColor: "rgba(0, 0, 0, 0.5)", // Increase darkness by adjusting alpha value
    //filter: "url(#blur)",
  };
  const linearProgressStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
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
              backgroundColor: "rgba(52, 52, 52, 0.8)",
            },
          },
        }}
        style={{
          // Set z-index to ensure it appears at the top
          zIndex: 999,
        }}
      >
        <>
          <Box sx={style}>
            {location.pathname === "/login" ? <LoginForm /> : <RegisterForm />}
          </Box>
          <Box sx={linearProgressStyle}>
            {auth.isLoading && <LinearProgress />}
          </Box>
        </>
      </Modal>
    </div>
  );
};

export default AuthModal;
