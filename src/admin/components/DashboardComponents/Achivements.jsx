import { Button, Card, CardContent, Typography, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const TriangleImg = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});
const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});
const Achivements = ({ sales }) => {
  const navigate = useNavigate();
  return (
    <Card className="space-y-5 border mt-5" sx={{ position: "relative" }}>
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
          Shop with Fly Cart
        </Typography>
        <Typography varient="body2">Congratulations 🥳</Typography>
        <Typography variant="h5" sx={{ my: 3.1 }}>
          {sales} New Sales
        </Typography>
        <Button
          size="small"
          variant="contained"
          onClick={() => navigate("/admin/orders")}
        >
          View Sales
        </Button>
        <TriangleImg src=""></TriangleImg>
        <TrophyImg src="https://static.vecteezy.com/system/resources/previews/014/493/309/original/golden-trophy-for-the-winners-of-the-sport-achievement-award-concept-png.png"></TrophyImg>
      </CardContent>
    </Card>
  );
};

export default Achivements;
