import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi, orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getFeeds = createAsyncThunk('feed/getAll', getFeedsApi);
export const getProfileOrders = createAsyncThunk('feed/getProfileOrders', getOrdersApi);
export const createOrder = createAsyncThunk('feed/createOrder', orderBurgerApi);

type TFeedState = {
  orders: TOrder[]; // Общая лента
  profileOrders: TOrder[]; // Заказы пользователя
  total: number;
  totalToday: number;
  orderRequest: boolean; // Статус отправки заказа
  orderModalData: TOrder | null; // Данные созданного заказа для модалки
  loading: boolean;
};

const initialState: TFeedState = {
  orders: [],
  profileOrders: [],
  total: 0,
  totalToday: 0,
  orderRequest: false,
  orderModalData: null,
  loading: false
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    closeOrderModal: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Общая лента
      .addCase(getFeeds.pending, (state) => { state.loading = true; })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      // История заказов профиля
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.profileOrders = action.payload;
      })
      // Создание заказа
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectProfileOrders: (state) => state.profileOrders,
    selectFeedTotal: (state) => ({ total: state.total, totalToday: state.totalToday }),
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  }
});

export const { closeOrderModal } = feedSlice.actions;
export const { selectOrders, selectProfileOrders, selectFeedTotal, selectOrderRequest, selectOrderModalData } = feedSlice.selectors;
export default feedSlice.reducer;
