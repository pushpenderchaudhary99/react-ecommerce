import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../States/Orders/Action";

const DeliveryAddressForm = () => {
  const [selectedAddress, setSelectedAdress] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // console.log("auth", auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };
    //Sending Request to backend
    const orderData = {
      address,
      navigate,
    };
    dispatch(createOrder(orderData));
  };
  const handleCreateOrder = (item) => {
    console.log("item in handel create order : ", item);

    dispatch(createOrder({ address: item, navigate }));
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-[1.2rem] mb-4 ml-4 ">
        Select Delivary Address
      </h1>
      <div>
        <Grid container spacing={4}>
          {/*Saved Address  */}
          <Grid item xs={12} lg={5}>
            <Box className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll ">
              {auth.user?.adresses.map((item) => (
                <div
                  onClick={() => setSelectedAdress(item)}
                  className="p-5 py-7 border-b cursor-pointer"
                >
                  {" "}
                  <AddressCard address={item} />
                  {selectedAddress?.id === item.id && (
                    <Button
                      sx={{ mt: 2 }}
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={() => handleCreateOrder(item)}
                    >
                      Deliverd Here
                    </Button>
                  )}
                </div>
              ))}
            </Box>
          </Grid>
          {/* Address Form */}
          <Grid item xs={12} lg={7}>
            {!isVisible && (
              <Grid item xs={12}>
                <Button
                  onClick={toggleVisibility}
                  sx={{
                    padding: ".9rem 1.5rem",
                    bgcolor: "RGB(145 85 253)",
                  }}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Add New Address
                </Button>
              </Grid>
            )}
            {isVisible && (
              <>
                <Box className="border rounded-md shadow-md p-5">
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="firstName"
                          name="firstName"
                          label="First Name"
                          fullWidth
                          autoComplete="given-name"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="lastName"
                          name="lastName"
                          label="Last Name"
                          fullWidth
                          autoComplete="given-name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="address"
                          name="address"
                          label="Address"
                          fullWidth
                          autoComplete="shipping address"
                          multiline
                          rows={4}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="city"
                          name="city"
                          label="City"
                          fullWidth
                          autoComplete="shipping address-level2"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="state"
                          name="state"
                          label="State/Province/Region"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="zip"
                          name="zip"
                          label="Zip / Postal code"
                          fullWidth
                          autoComplete="shipping postal-code"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="phoneNumber"
                          name="phoneNumber"
                          label="Phone Number"
                          fullWidth
                          autoComplete="tel"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          sx={{
                            padding: ".9rem 1.5rem",
                            bgcolor: "RGB(145 85 253)",
                          }}
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Deliverd Here
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </>
            )}{" "}
            {/* Render OtherComponent only if isVisible is true */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DeliveryAddressForm;
