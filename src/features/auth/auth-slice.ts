import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../../api/authApi';
import { AxiosError } from 'axios';
import {
  ErrorResponse,
  ErrorResponseSerialized,
  RefreshTokenRes,
} from '../../Types/responseType';
import { AppDispatch, RootState } from '../../app/store';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  user: {
    userId: string;
    roles: string[];
  } | null;
}

interface NewShopReq {
  name: string;
  email: string;
  password: string;
}

interface AuthRes {
  code: number;
  metadata: {
    shop: { email: string; name: string; id: string; roles: string[] };
    tokens: {
      accessToken: string;
      refeshToken: string;
    };
  };
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  error: null,
  user: null,
};

interface ShopLoginReq {
  email: string;
  password: string;
}

export const shopLogin = createAsyncThunk<
  AuthRes,
  ShopLoginReq,
  { rejectValue: ErrorResponse }
>('auth/shopLogin', async (shopLoginReq, thunkAPI) => {
  try {
    const resp = await authApi.ShopLogin(shopLoginReq);

    // fail request
    if (resp.data.message) {
      return thunkAPI.rejectWithValue(resp.data);
    }

    // success
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

export const createNewShop = createAsyncThunk<
  AuthRes,
  NewShopReq,
  { rejectValue: ErrorResponse }
>('auth/newShop', async (newShop, thunkAPI) => {
  try {
    const resp = await authApi.CreateNewShop(newShop);

    // request fail
    if (resp.data.message) {
      return thunkAPI.rejectWithValue(resp.data);
    }

    // request success
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

export const refreshToken = createAsyncThunk<
  RefreshTokenRes,
  {},
  {
    rejectValue: ErrorResponseSerialized;
    state: RootState;
    dispatch: AppDispatch
  }
>('auth/refreshToken', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    console.log(state.auth.refreshToken);
    const resp = await authApi.GetRefreshToken(state.auth.refreshToken || '');
    if (resp.data.errors) {
      return thunkAPI.rejectWithValue(resp.data);
    }
    return resp.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue({
        errors: [
          {
            message: error.message,
          },
        ],
      });
    }
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetCredential(state) {
      (state.user = null),
        (state.accessToken = null),
        (state.refreshToken = null);
    },
    setCredential(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewShop.fulfilled, (state, action) => {
        state.error = null;
        state.user = {
          userId: action.payload.metadata.shop.id,
          roles: action.payload.metadata.shop.roles,
        };
        state.accessToken = action.payload.metadata.tokens.accessToken;
        state.refreshToken = action.payload.metadata.tokens.refeshToken;
      })
      .addCase(createNewShop.rejected, (state, action) => {
        state.error = action.payload?.message || null;
      })
      .addCase(shopLogin.rejected, (state, action) => {
        state.error = action.payload?.message || null;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(shopLogin.fulfilled, (state, action) => {
        state.error = null;
        state.user = {
          userId: action.payload.metadata.shop.id,
          roles: action.payload.metadata.shop.roles,
        };
        state.accessToken = action.payload.metadata.tokens.accessToken;
        state.refreshToken = action.payload.metadata.tokens.refeshToken;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.error = null
        state.accessToken = action.payload.metadata.tokens.accessToken
        state.refreshToken = action.payload.metadata.tokens.refeshToken
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.payload?.errors[0].message || null
      });
  },
});

export const { resetCredential } = authSlice.actions;
export default authSlice.reducer;
