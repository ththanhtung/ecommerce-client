import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useTypedSelector } from '../../../../app/store';
import { getProducts } from '../../products-slice';
import ProductCard from '../../components/ProductCard';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useTypedSelector((state) => state.products);
  const { user } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProducts({}));
  }, []);

  return products ? (
    <div>
      {user ? (
        <div>
          <Link style={{ marginRight: '1em' }} to={'auth/logout'}>
            logout
          </Link>
          <Link to={'cart'}>cart</Link>
        </div>
      ) : (
        <div>
          <Link style={{ marginRight: '1em' }} to="auth/login">
            login
          </Link>
          <Link to="auth/signup">sign up</Link>
        </div>
      )}
      {products.map((product) => (
        <ProductCard {...product} />
      ))}
    </div>
  ) : (
    <div>no products</div>
  );
};

export default ProductsPage;
