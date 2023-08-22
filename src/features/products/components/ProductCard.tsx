import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  productId: string;
  productName: string;
  productPrice: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  productName,
  productPrice,
}) => {
  return (
    <article>
      <Link to={`products/${productId}`}>
        <h2>{productName}</h2>
        <p>{productPrice}</p>
      </Link>
    </article>
  );
};

export default ProductCard;
