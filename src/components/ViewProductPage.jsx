import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ViewProductPage = ({ prods, onDeleteProducts }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const params = useParams();

  const produkto = prods.find((prod) => prod.id === +params.id);

  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ marginTop: 20 }}
    >
      {/* <Grid item xs={3}></Grid> */}
      <Grid item xs={3}>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          component={Link}
          to={`/`}
        >
          Back to Main Page
        </Button>
        <Card
          variant="outlined"
          sx={{ width: 500, float: "center", marginTop: 2 }}
        >
          <Typography level="h1" fontSize="lg" fontWeight="lg" sx={{ mb: 0.5 }}>
            {produkto.title}
          </Typography>
          <Typography level="body2">{`PHP ${produkto.price}`}</Typography>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
            onClick={handleClick}
          >
            <MoreVertIcon />
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
            <MenuItem onClick={() => navigate(`/products/${produkto.id}/edit`)}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => {onDeleteProducts(produkto.id);
            navigate("/");}}>
              Delete
            </MenuItem>
          </Menu>
          <AspectRatio minHeight="100%" maxHeight="500px" sx={{ my: 2 }}>
            <img
              src={produkto.image}
              srcSet={produkto.image}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <Box sx={{ display: "flex" }}>
            <div>
              {/* <Typography level="body3">Total price:</Typography> */}
              <Typography fontSize="md" fontWeight="md">
                {produkto.description}
              </Typography>
            </div>
            {/* <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", fontWeight: 600 }}
        >
          Explore
        </Button> */}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ViewProductPage;
