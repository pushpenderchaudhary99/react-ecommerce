import { useEffect, useState } from "react";
import { Container, Grid, TextField, Typography, Button } from "@mui/material";
import { Person, Email, Phone, Lock, AssignmentInd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../../States/Auth/Action";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const iconStyle = {
    fontSize: 20,
    color: "#4a90e2", // Light blue color
    cursor: "pointer",
  };
  const iconStyleMain = {
    fontSize: 40,
    color: "#4a90e2", // Light blue color
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "200",
    color: "#333333", // grey
    marginBottom: "2rem",
    fontFamily: "Verdana",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <Container maxWidth="sm" className="mt-8">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} textAlign="center">
          <AssignmentInd style={iconStyleMain} />
          <Typography variant="h4" gutterBottom style={titleStyle}>
            Register
          </Typography>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Person style={{ ...iconStyle, marginRight: "1rem" }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Person style={{ ...iconStyle, marginRight: "1rem" }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Email style={{ ...iconStyle, marginRight: "1rem" }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Mobile No"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Phone style={{ ...iconStyle, marginRight: "1rem" }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <Lock style={{ ...iconStyle, marginRight: "1rem" }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: "1.5rem", mb: "1.5rem" }}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ height: "3rem" }}
            >
              Register
            </Button>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1" gutterBottom>
              Already registered?{"  "}
              <span
                className="text-blue-600 cursor-pointer hover:underline  "
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterForm;
