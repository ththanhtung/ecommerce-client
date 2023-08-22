import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import productApi from '../../../../api/productApi';
import { ProductDetailInfo } from '../../../../Types/productType';
import { AxiosError } from 'axios';
import { GetOneProductRes } from '../../../../Types/responseType';
import { useTypedSelector } from '../../../../app/store';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetailInfo>();

  const auth = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = async () => {
    if (!auth.user) {
      console.log('not auth yet');
      navigate('../../auth/login', {
        replace: true,
        state: { from: location },
      });
    }
    console.log('ok');
  };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const resp = await productApi.getOneProduct(id);
        const respData = resp.data as GetOneProductRes;
        const productResp = respData.metadata.product;
        const productData: ProductDetailInfo = {
          productName: productResp.product_name,
          productAttrs: productResp.product_attributes,
          productAverageRating: productResp.product_averageRating,
          productDesc: productResp.product_desc,
          productId: productResp._id,
          productPrice: productResp.product_price,
          productQuantity: productResp.product_quantity,
          productShop: productResp.product_shop,
          productType: productResp.product_type,
        };
        setProduct(productData);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.message);
        }
      }
    };
    getProduct();
  }, []);
  return (
    <div>
      {product?.productName}
      <button onClick={handleAddToCart}>add to cart</button>
    </div>
  );
};

export default ProductDetail;
