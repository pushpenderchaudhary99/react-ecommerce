import { Label } from "@mui/icons-material";
import { Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";

const OrderTraker = ({ activeStep }) => {
  const steps = ["Placed", "Order Confirmed", "Shipped", "On Way", "Delivered"];
  useEffect(() => {}, [activeStep]);
  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ color: "#9155FD", fontSize: "44px" }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTraker;
