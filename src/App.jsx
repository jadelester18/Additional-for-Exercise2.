import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import { PRODUCTS_DATA } from "./data/products";
import AddProductPage from "./components/AddProductPage";
import EditProductPage from "./components/EditProductPage";
import ViewProductPage from "./components/ViewProductPage";

function App() {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [cartItems, setCartItems] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [showCart, setShowCart] = useState(false);
 
    const handleDeleteProducts = (id) => {
      setProducts(products.filter((prod) => prod.id !== id));
    };

  const handleAddProducts = (prod) => {
    setProducts([...products, { ...prod, id: products.length * 999 + 1 }]);
  };

  const handleEditProducts = (id, prod) => {
    setProducts(
      products.map((item) => {
        if (item.id === id) {
          return {
            ...prod,
            id,
          };
        }
        return item;
      })
    );
  };

  const toggleCartItems = () => {
    setShowCart(!showCart);
  };

  const handleAddToCart = (prod) => {
    const cartItem = cartItems.find((item) => item.prod.id === prod.id);

    if (cartItem) {
      setCartItems(
        cartItems.map((item) => {
          if (item.prod.id === prod.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        })
      );
    } else {
      setCartItems([...cartItems, { prod, quantity: 1 }]);
    }
  };

  const handleReducItemFromCart = (prod) => {
    const cartItem = cartItems.find((item) => item.prod.id === prod.id);

    if (cartItem.quantity === 1) {
      setCartItems(cartItems.filter((cItem) => cItem.prod.id !== prod.id));
    } else {
      setCartItems(
        cartItems.map((item) => {
          if (item.prod.id === prod.id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        })
      );
    }
  };

  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar
        showCartSummary={showCart}
        showPopCartItems={toggleCartItems}
        cartItems={cartItems}
        cartItemCount={cartItems.length}
      />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/products/new"
          element={<AddProductPage onAddProduct={handleAddProducts} />}
        />
        <Route
          path="/products/:id"
          element={
            <ViewProductPage
              prods={products}
              onDeleteProducts={handleDeleteProducts}
            />
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <EditProductPage
              onEditProduct={handleEditProducts}
              prods={products}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );

  function ProductsPage() {
    return (
      <Container sx={{ marginTop: 3 }}>
        <Products
          quantityOfItemInCart={cartItems}
          onAddToCart={handleAddToCart}
          onRemoveToCart={handleReducItemFromCart}
          onDeleteProducts={handleDeleteProducts}
          products={products}
        />
      </Container>
    );
  }
}

export default App;


