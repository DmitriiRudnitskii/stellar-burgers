import { orderSlice, getOrderByNumber } from './orderSlice';

describe('orderSlice', () => {
  const reducer = orderSlice.reducer;
  const initialState = {
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

  const mockOrder = {
    createdAt: '2023-10-10',
    ingredients: ['id1', 'id2'],
    _id: '6453',
    status: 'done',
    name: 'Супер бургер',
    updatedAt: '2023-10-10',
    number: 12345
  };

  describe('Асинхронный экшен getOrderByNumber', () => {
    it('должен ставить isOrderLoading=true при pending', () => {
      const action = { type: getOrderByNumber.pending.type };
      const state = reducer(initialState, action);
      expect(state.isOrderLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сохранять данные и ставить isOrderLoading=false при fulfilled', () => {
      // Ваш код в слайсе берет первый заказ из массива orders: action.payload.orders[0]
      const action = { type: getOrderByNumber.fulfilled.type, payload: { orders: [mockOrder] } };
      const state = reducer({ ...initialState, isOrderLoading: true }, action);
      
      expect(state.isOrderLoading).toBe(false);
      expect(state.orderData).toEqual(mockOrder);
    });

    it('должен сохранять ошибку и ставить isOrderLoading=false при rejected', () => {
      const action = { type: getOrderByNumber.rejected.type, error: { message: 'Order not found' } };
      const state = reducer({ ...initialState, isOrderLoading: true }, action);
      
      expect(state.isOrderLoading).toBe(false);
      expect(state.error).toBe('Order not found');
    });
  });
});
