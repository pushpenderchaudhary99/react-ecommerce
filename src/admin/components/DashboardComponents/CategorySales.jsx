import { Card, CardHeader } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import React from "react";
const data = [
  { value: 10, label: "series A" },
  { value: 15, label: "series B" },
  { value: 20, label: "series C" },
];
const CategorySales = ({ salesData }) => {
  return (
    <div className="mt-5 border rounded-md">
      <Card sx={{ padding: "5px", pb: "20px" }}>
        <CardHeader title="Sales Per Category" />
        <PieChart
          series={[
            {
              data: salesData, // Pass salesData directly as the data property
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={200}
        />
      </Card>
    </div>
  );
};

export default CategorySales;
