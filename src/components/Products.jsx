import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const Products = ({
  products,
  onAddToCart,
  quantityOfItemInCart,
  onRemoveToCart,
  onDeleteProducts,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} justifyContent="flex-end" textAlign="right">
        <Button
          variant="contained"
          startIcon={<Add />}
          LinkComponent={Link}
          to="/products/new"
        >
          Add Product
        </Button>
      </Grid>
      {products.map((prod) => (
        <Grid item md={3} xs={12} key={prod.id}>
          <ProductCard
            quantityOfItems={quantityOfItemInCart.find(
              (items) => items.prod.id === prod.id
            )}
            AddToCart={onAddToCart}
            RemoveToCart={onRemoveToCart}
            DeleteProducts={onDeleteProducts}
            product={prod}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
