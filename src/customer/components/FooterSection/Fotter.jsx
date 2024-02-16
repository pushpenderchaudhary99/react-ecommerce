import { Button, Grid, Link, Typography } from "@mui/material";
import React from "react";

export const Fotter = () => {
  return (
    <div>
      <Grid
        className="bg-black text-white text-center mt-10 "
        container
        sx={{ bgcolor: "black", color: "white", py: 3 }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            Company
          </Typography>
          <div className=" flex flex-col ">
            <Button className="pb-5 " variant="h6">
              About
            </Button>
            <Button className="pb-5" variant="h6">
              Blog
            </Button>
            <Button className="pb-5" variant="h6">
              Press
            </Button>
            <Button className="pb-5" variant="h6">
              Jobs
            </Button>
            <Button className="pb-5" variant="h6">
              Partners
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            Consumer Policy
          </Typography>
          <div className=" flex flex-col">
            <Button className="pb-5" variant="h6">
              Cancellation & Returns
            </Button>
            <Button className="pb-5" variant="h6">
              Terms of use
            </Button>
            <Button className="pb-5" variant="h6">
              Security
            </Button>
            <Button className="pb-5" variant="h6">
              Privacy
            </Button>
            <Button className="pb-5" variant="h6">
              Sitemap
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            Social
          </Typography>
          <div className=" flex flex-col">
            <Button className="pb-5" variant="h6">
              Facebook
            </Button>
            <Button className="pb-5" variant="h6">
              Instagram
            </Button>
            <Button className="pb-5" variant="h6">
              Twitter (X)
            </Button>
            <Button className="pb-5" variant="h6">
              Youtube
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            Help
          </Typography>
          <div className=" flex flex-col">
            <Button className="pb-5" variant="h6">
              Payment
            </Button>
            <Button className="pb-5" variant="h6">
              Shipping
            </Button>
            <Button className="pb-5" variant="h6">
              Cancellation & Returns
            </Button>
          </div>
        </Grid>
        <Grid className="pt-20" item xs={12}>
          <Typography variant="body2" component="p" align="center">
            &copy; 2024 Fly Cart.
          </Typography>

          <Typography variant="body2" component="p" align="center">
            Made by Pushpender Chaudhary
          </Typography>
          <Typography variant="body2" component="p" align="center">
            Email :
            <Link
              href="mailto:pushpenderchaudhary1999@gmail.com"
              color="inherit"
              underline="always"
            >
              pushpenderchaudhary1999@gmail.com
            </Link>{" "}
            Mobile :{" "}
            <Link href="#" color="inherit" underline="always">
              8091711756
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
