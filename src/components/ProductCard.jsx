import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Grid,
  IconButton,
  Modal,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { Add, AddShoppingCartOutlined, Close, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 40,
  p: 4,
};

const ProductCard = ({
  product,
  AddToCart,
  quantityOfItems,
  RemoveToCart,
  DeleteProducts,
}) => {
  const [value, setValue] = React.useState(product.rating.rate);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const quantityCartAction = () => {
    return quantityOfItems ? (
      <Grid container spacing={3} direction="row" justifyContent="center">
        <Grid item xs={5} sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => RemoveToCart(product)}
          >
            <Remove />
          </Button>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          <Typography variant="h6">{quantityOfItems.quantity}</Typography>
        </Grid>
        <Grid item xs={5} sx={{ textAlign: "left" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => AddToCart(product)}
          >
            <Add />
          </Button>
        </Grid>
      </Grid>
    ) : (
      <Button
        size="small"
        color="primary"
        fullWidth
        startIcon={<AddShoppingCartOutlined />}
        onClick={() => AddToCart(product)}
      >
        ADD TO CART
      </Button>
    );
  };

  return (
    <Card sx={{ maxWidth: 345, textDecoration: "none" }}>
      {/* <Link to={`/products/${product.id}`}> */}
      <CardActionArea component={Link} to={`/products/${product.id}`}>
        <CardMedia
          component="img"
          height="100%"
          image={product.image}
          alt={product.title}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            {product.category}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {`PHP ${product.price}`}
          </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </CardContent>
      </CardActionArea>
      {/* </Link> */}
      <CardActions sx={{ backgroundColor: "#eeeeee" }}>
        {quantityCartAction()}
      </CardActions>
      <CardActions sx={{ backgroundColor: "#eeeeee" }}>
        <Grid container spacing={1} direction="row" justifyContent="center">
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Button variant="contained" fullWidth onClick={handleOpen}>
              <Typography variant="body2">View</Typography>
            </Button>
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <IconButton
                color="primary"
                component="label"
                onClick={handleClose}
                sx={{ float: "right" }}
              >
                <Close />
              </IconButton>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {product.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {product.description}
              </Typography>
            </Box>
          </Modal>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Link to={`/products/${product.id}/edit`}>
              <Button variant="contained" fullWidth>
                <Typography variant="body2">Edit</Typography>
              </Button>
            </Link>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "left" }}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() => DeleteProducts(product.id)}
            >
              <Typography variant="body2">Delete</Typography>
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
