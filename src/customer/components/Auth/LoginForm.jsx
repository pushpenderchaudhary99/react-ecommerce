import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";
import { Email, Lock, AssignmentInd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser, login } from "../../../States/Auth/Action";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  const iconStyle = {
    fontSize: 20,
    color: "#4a90e2", // Light blue color
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "200",
    color: "#333333", // Grey color
    marginBottom: "2rem",
    fontFamily: "Verdana",
  };

  return (
    <Container maxWidth="sm" className="mt-8">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} textAlign="center">
          <AssignmentInd style={{ ...iconStyle, fontSize: 40 }} />
          <Typography variant="h4" gutterBottom style={titleStyle}>
            Login
          </Typography>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
          <Grid item xs={12} textAlign="right">
            <Typography variant="body2" gutterBottom>
              <Link href="#" underline="hover">
                Forgot Password?
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: "1.5rem", mb: "1.5rem" }}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ height: "3rem" }}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1" gutterBottom>
              New User?{"  "}
              <span
                className="text-blue-600 cursor-pointer hover:underline  "
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginForm;
