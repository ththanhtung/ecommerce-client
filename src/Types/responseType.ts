import { ProductBriefInfo } from './productType';

export interface ErrorResponse {
  message: string;
  code: number;
  status: string;
}

export interface ErrorResponseSerialized {
  errors: {
    message: string;
  }[];
}

export interface GetProductsRes {
  code: number;
  metadata: {
    products: {
      _id: string;
      product_name: string;
      product_price: number;
    }[];
  };
}

export interface GetOneProductRes {
  code: number;
  metadata: {
    product: {
      product_attributes: { [k: string]: string };
      product_averageRating: number;
      product_desc: string;
      product_name: string;
      product_price: number;
      product_quantity: number;
      product_shop: string;
      product_slug: string;
      product_type: string;
      updatedAt: Date;
      _id: string;
    };
  };
}

export interface RefreshTokenRes {
  metadata: {
    user: {
      userId: string;
      email: string;
      roles: string[];
    };
    tokens: {
      accessToken: string;
      refeshToken: string;
    };
  };
}
