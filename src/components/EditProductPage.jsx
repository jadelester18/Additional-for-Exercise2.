import React from 'react'
import { useParams } from 'react-router-dom'
import ProductForm from '../Forms/ProductForm';

const EditProductPage = ({ prods, onEditProduct }) => {
  const params = useParams();

  const { id, ...product } = prods.find(
    (product) => product.id === +params.id
  );

  return (
    <div>
      <ProductForm
        onSubmit={(form) => onEditProduct(id, form)}
        initialValue={product}
      />
    </div>
  );
};

export default EditProductPage