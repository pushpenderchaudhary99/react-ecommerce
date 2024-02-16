// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Icons Imports
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DevicesIcon from "@mui/icons-material/Devices";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import { useEffect } from "react";

const MonthlyOverview = ({ data, growth }) => {
  const salesData = [
    {
      stats: data?.sales,
      title: "Sales",
      color: "primary",
      icon: <TrendingUpIcon sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: data?.customers,
      title: "Customers",
      color: "success",
      icon: <AccountBoxOutlinedIcon sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: data?.products,
      color: "warning",
      title: "Products",
      icon: <DevicesIcon sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: data.revenue,
      color: "info",
      title: "Revenue",
      icon: <CurrencyRupeeIcon sx={{ fontSize: "1.75rem" }} />,
    },
  ];
  const renderStats = () => {
    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            variant="rounded"
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: "common.white",
              backgroundColor: `${item.color}.main`,
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption">{item.title}</Typography>
            <Typography variant="h6">{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ));
  };
  useEffect(() => {}, [growth]);
  return (
    <Card className="mt-5 border">
      <CardHeader
        title="Statistics"
        action={
          <IconButton
            size="small"
            aria-label="settings"
            className="card-more-options"
            sx={{ color: "text.secondary" }}
          >
            <MoreVertIcon />
          </IconButton>
        }
        subheader={
          <Typography variant="body2">
            <Box
              component="span"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Total {growth}% growth
            </Box>{" "}
            😎 this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverview;
