import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { Badge, Grid, Menu, MenuItem } from "@mui/material";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = ({
  cartItemCount,
  showCartSummary,
  showPopCartItems,
  cartItems,
}) => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (acc, cartItem) => acc + cartItem.prod.price * cartItem.quantity,
      0
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
            component={Link}
            to={`/`}
          >
            MY SHOP
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justifyContent="center"
                  sx={{ width: 1000, padding: 2 }}
                >
                  <Grid
                    item
                    xs={3}
                    sx={{
                      textAlign: "right",
                      marginTop: 2,
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    Title
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      textAlign: "right",
                      marginTop: 2,
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    Quantity
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      textAlign: "right",
                      marginTop: 2,
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    Unit
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      textAlign: "right",
                      marginTop: 2,
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    Price
                  </Grid>
                </Grid>
                {cartItems.map((list) => (
                  <Grid
                    container
                    spacing={3}
                    direction="row"
                    justifyContent="center"
                    sx={{ width: 1000, padding: 2 }}
                  >
                    <Grid item xs={3} sx={{ textAlign: "right", marginTop: 2 }}>
                      {list.prod.title}
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: "right", marginTop: 2 }}>
                      {list.quantity}
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: "right", marginTop: 2 }}>
                      {`PHP ${list.prod.price}`}
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: "right", marginTop: 2 }}>
                      {`PHP ${list.prod.price * list.quantity}`}
                    </Grid>
                  </Grid>
                ))}
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justifyContent="center"
                  sx={{ width: 1000, padding: 2 }}
                >
                  <Grid
                    item
                    xs={3}
                    sx={{
                      textAlign: "right",
                      marginTop: 2,
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      textAlign: "right",
                      marginTop: 2,
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  ></Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      textAlign: "right",
                      marginTop: 2,
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    Total
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      textAlign: "right",
                      marginTop: 2,
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    {`PHP ${getTotalPrice()}`}
                  </Grid>
                </Grid>
              </Menu>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
