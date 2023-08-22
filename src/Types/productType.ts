export interface ProductDetailInfo {
  productId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productDesc: string;
  productType: string;
  productShop: string;
  productAverageRating: number;
  productAttrs: { [key: string]: string };
}

export interface ProductBriefInfo {
  productId: string;
  productName: string;
  productPrice: number;
}
