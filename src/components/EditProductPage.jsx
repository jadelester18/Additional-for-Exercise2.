import React from 'react'
import { useParams } from 'react-router-dom'
import ProductForm from '../Forms/ProductForm';

const EditProductPage = ({ prods, onEditProduct }) => {
  const params = useParams();

  const { id, title, price, description, category, image } = prods.find(
    (product) => product.id === +params.id
  );

  const handleSubmit = (prod) => {
    onEditProduct(id, prod);
  };

  return (
    <div>
      <ProductForm
        initialValue={{ title, price, description, category, image }}
        onSubmit={(form) => handleSubmit(form)}
      />
    </div>
  );
};

export default EditProductPage