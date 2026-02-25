import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi, getOrderByNumberApi } from '@api';

type TOrderState = {
  orderData: TOrder;
  isOrderLoading: boolean;
  error: string | null;
};

export const getOrderByNumber = createAsyncThunk(
  '/orderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const initialState: TOrderState = {
  orderData: {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  },
  isOrderLoading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder

      .addCase(getOrderByNumber.pending, (state) => {
        state.isOrderLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error.message as string | null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderData = action.payload.orders[0];
      });
  }
});

export const { getOrderSelector } = orderSlice.selectors;
