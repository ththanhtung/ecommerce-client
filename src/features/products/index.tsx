import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProductDetail from './page/ProductDetails';
import NotFound from '../../components/NotFound';

const Products = () => {
  return (
    <Routes>
      <Route index element={<Navigate to='..'/>}/>
      <Route path=":id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Products;
