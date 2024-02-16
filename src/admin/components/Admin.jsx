import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProductsTabel from "./ProductsTabel";
import CreateProductForm from "./CreateProductForm";
import CustomerTabel from "./CustomerTabel";
import OrdersTabel from "./OrdersTabel";
import PageNotFount from "../../customer/Pages/PageNotFount";
import { Lock, Logout } from "@mui/icons-material";
import { logout } from "../../States/Auth/Action";
import { useDispatch } from "react-redux";
const menu = [
  { name: "Dashboard", path: "/admin", icon: <SpaceDashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <LocalMallIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <LocalShippingIcon /> },
  {
    name: "Add Product",
    path: "/admin/product/create",
    icon: <InventoryIcon />,
  },
];
const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [accountClicked, setAccountClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelAccountClick = () => {
    setAccountClicked(!accountClicked);
  };
  const handelLogoutClick = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };
  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {/* {isLargeScreen && <Toolbar />} */}
      <List>
        {menu.map((item, index) => (
          <ListItem
            sx={{ width: "200px" }}
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {accountClicked && (
          <div>
            <div className="mx-3 mb-1 border rounded-md">
              <ListItemButton>
                <ListItemIcon>
                  <Lock />
                </ListItemIcon>
                <ListItemText>Password</ListItemText>
              </ListItemButton>
            </div>
            <div className="mx-3 mb-1 border rounded-md">
              <ListItemButton onClick={handelLogoutClick}>
                <ListItemIcon>
                  <Logout></Logout>
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItemButton>
            </div>
          </div>
        )}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handelAccountClick}
            sx={{
              border: "1px solid #eeeeee",
              background: accountClicked ? "#eeeeee" : "unset",
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </ListItemButton>
        </ListItem>
        ))
      </List>
    </Box>
  );
  return (
    <div className="bg-gray-100">
      <Box sx={{ display: `${isLargeScreen}` ? "flex" : "block" }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            height: "100vh",
            width: "200px",
            flexShrink: 0,
          }}
        >
          {drawer}
        </Drawer>
        <Box className="pl-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductsTabel />} />
            <Route path="/product/create" element={<CreateProductForm />} />
            <Route path="/orders" element={<OrdersTabel />} />
            {/* Page Not Found */}
            <Route path="*" element={<PageNotFount />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
};

export default Admin;
