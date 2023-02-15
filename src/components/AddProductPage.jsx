import React from "react";
import ProductForm from "../Forms/ProductForm";

const AddEmployeePage = ({ onAddProduct }) => {
  return (
    <div>
      <ProductForm onSubmit={onAddProduct} />
    </div>
  );
};

export default AddEmployeePage;
