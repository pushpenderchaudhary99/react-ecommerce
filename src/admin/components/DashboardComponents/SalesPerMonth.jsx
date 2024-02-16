import { Button, Card, CardHeader } from "@mui/material";
import React, { useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const chartSetting = {
  yAxis: [
    {
      label: "Sales / Month",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-10px, 0)",
    },
  },
};

const valueFormatter = (value) => `${value} /month`;

const SalesPerMonth = ({ dataset, year, setYear }) => {
  useEffect(() => {}, [dataset]);
  return (
    <div className="mt-5 border rounded-md">
      {console.log("NEW MONTLY SALES DATA FETCHED : ", dataset)}
      <Card sx={{ padding: "5px", pb: "20px" }}>
        <CardHeader
          title="Sales Per Month"
          action={
            <div className="flex w-full justify-end  items-center">
              <Button
                sx={{ color: "black" }}
                onClick={() => setYear((prev) => prev - 1)}
              >
                <RemoveIcon />
              </Button>
              <div className="border h-10 w-20 flex justify-center items-center rounded-md ml-2 mr-2">
                {year}
              </div>

              <Button
                sx={{ color: "black" }}
                onClick={() => setYear((prev) => prev + 1)}
              >
                <AddIcon />
              </Button>
            </div>
          }
        />

        <div className="pl-5">
          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[
              {
                dataKey: "sales",
                label: "Sales",
                color: "green",
                valueFormatter,
              },
            ]}
            {...chartSetting}
          />
        </div>
      </Card>
    </div>
  );
};

export default SalesPerMonth;
