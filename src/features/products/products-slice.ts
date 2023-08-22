import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductBriefInfo } from '../../Types/productType';
import productApi from '../../api/productApi';
import { ErrorResponse, GetProductsRes } from '../../Types/responseType';
import { AxiosError } from 'axios';

interface productState {
  selectedProduct: string | null;
  products: ProductBriefInfo[] | null;
}

const initialState: productState = {
  selectedProduct: null,
  products: null,
};

export const getProducts = createAsyncThunk<
  GetProductsRes,
  {},
  { rejectValue: ErrorResponse }
>('products/getProducts', async (_, thunkAPI) => {
  try {
    console.log('getProducts');
    const resp = await productApi.getProducts();

    if (resp.data.message) {
      return thunkAPI.rejectWithValue(resp.data);
    }
    return resp.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        code: error.status || 400,
        status: 'error',
      });
    }
  }
});

export const getProduct = createAsyncThunk('products/getproduct', async (productId, thunkAPI)=>{
  
})

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct(state, action: PayloadAction<{ productId: string }>) {
      state.selectedProduct = action.payload.productId
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      const products = action.payload.metadata.products.map((product) => ({
        productId: product._id,
        productName: product.product_name,
        productPrice: product.product_price,
      }));
      state.products = products;
    });
  },
});

export default productSlice.reducer;
