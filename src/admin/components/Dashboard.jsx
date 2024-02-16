import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Achivements from "./DashboardComponents/Achivements";
import MonthlyOverview from "./DashboardComponents/MonthlyOverview";
import ProductsTabel from "./ProductsTabel";
import { userApi } from "../../configuration/ApiConfig";
import CategorySales from "./DashboardComponents/CategorySales";
import SalesPerMonth from "./DashboardComponents/SalesPerMonth";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    customers: 0,
    products: 0,
    sales: 0,
    revenue: 0,
  });
  const [categorySalesData, setCategorySalesData] = useState([]);
  const initialState = [
    { month: "JAN", sales: 0 },
    { month: "FEB", sales: 0 },
    { month: "MAR", sales: 0 },
    { month: "APR", sales: 0 },
    { month: "MAY", sales: 0 },
    { month: "JUN", sales: 0 },
    { month: "JUL", sales: 0 },
    { month: "AUG", sales: 0 },
    { month: "SEP", sales: 0 },
    { month: "OCT", sales: 0 },
    { month: "NOV", sales: 0 },
    { month: "DEC", sales: 0 },
  ];
  const [monthlySales, setMonthlySales] = useState(initialState);
  const [year, setYear] = useState(2024);
  const [monthlySalesGrowth, setMonthlySalesGrowth] = useState(0);

  function getCurrentMonth() {
    // Get current date
    let currentDate = new Date();
    // Get current month (0-indexed)
    let currentMonth = currentDate.getMonth();
    // Convert to string representation (e.g., "JAN")
    let months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return months[currentMonth];
  }
  const calculateSalesIncrease = (data) => {
    let result = [];
    let currentMonthIndex = -1;

    // Get current month
    let currentMonth = getCurrentMonth();

    // Find the index of the current month in the data
    for (let i = 0; i < data.length; i++) {
      if (data[i].month === currentMonth) {
        currentMonthIndex = i;
        break;
      }
    }

    // If current month is found
    if (currentMonthIndex !== -1) {
      // Calculate increase for current month compared to previous month
      let prevMonthSales =
        currentMonthIndex > 0
          ? data[currentMonthIndex - 1].sales
          : data[0].sales;
      let currentMonthSales = data[currentMonthIndex].sales;
      // Calculate percentage change
      if (prevMonthSales === 0) return currentMonthSales * 100;
      let percentageChange =
        ((currentMonthSales - prevMonthSales) / prevMonthSales) * 100;
      return Math.floor(percentageChange);
    }

    return result;
  };

  const fetchData = async () => {
    try {
      const { data } = await userApi.get("/api/admin/dashboard");
      if (data) {
        setDashboardData((prevState) => ({
          ...prevState,
          customers: data?.customerCount,
          products: data?.productsCount,
          sales: data?.deliveredOrders,
          revenue: data?.revenue,
        }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchSalesPerCategory = async () => {
    try {
      // Fetch data from API
      const { data } = await userApi.get(
        "/api/admin/dashboard/category_overview"
      );
      if (data) {
        setCategorySalesData(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchMontlySalesforYear = async (year) => {
    try {
      const { data } = await userApi.get(
        `/api/admin/dashboard/monthly_sales/${year}`
      );
      if (data) {
        setMonthlySales(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchSalesPerCategory();
  }, []);
  useEffect(() => {
    console.log("fetching monthly sales data");
    setMonthlySales(initialState);
    fetchMontlySalesforYear(year);
  }, [year]);
  useEffect(() => {
    setMonthlySalesGrowth(calculateSalesIncrease(monthlySales));
  }, [monthlySales]);
  return (
    <div className=" h-full w-[80rem] overflow-hidden">
      <Grid container spacing={2} className="">
        <Grid item xs={12} md={4}>
          <Achivements sales={dashboardData.sales} />
        </Grid>
        <Grid item xs={12} md={8}>
          <MonthlyOverview data={dashboardData} growth={monthlySalesGrowth} />
        </Grid>
        <Grid item xs={12} md={5}>
          <CategorySales salesData={categorySalesData} />
        </Grid>
        <Grid item xs={12} md={7}>
          <SalesPerMonth dataset={monthlySales} year={year} setYear={setYear} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
