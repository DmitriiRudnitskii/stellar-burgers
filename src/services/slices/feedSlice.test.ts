import { feedSlice, getFeed, getOrders, addFeed } from './feedSlice';

describe('feedSlice', () => {
  const reducer = feedSlice.reducer;
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  const mockOrders = [
    {
      _id: '1',
      ingredients: ['bun', 'meat'],
      status: 'done',
      name: 'Бургер',
      createdAt: '2023',
      updatedAt: '2023',
      number: 123
    }
  ];

  it('должен обрабатывать обычный экшен addFeed', () => {
    const payload = {
      orders: mockOrders,
      total: 100,
      totalToday: 10,
      loading: false,
      error: null
    };
    const state = reducer(initialState, addFeed(payload));
    expect(state).toEqual(payload);
  });

  describe('Асинхронный экшен getFeed', () => {
    it('должен ставить loading=true при pending', () => {
      const action = { type: getFeed.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сохранять данные и ставить loading=false при fulfilled', () => {
      const payload = { orders: mockOrders, total: 100, totalToday: 10 };
      const action = { type: getFeed.fulfilled.type, payload };
      const state = reducer({ ...initialState, loading: true }, action);

      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(10);
    });

    it('должен сохранять ошибку и ставить loading=false при rejected', () => {
      const action = {
        type: getFeed.rejected.type,
        error: { message: 'Fetch error' }
      };
      const state = reducer({ ...initialState, loading: true }, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Fetch error');
    });
  });

  describe('Асинхронный экшен getOrders', () => {
    it('должен ставить loading=true при pending', () => {
      const action = { type: getOrders.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сохранять данные и ставить loading=false при fulfilled', () => {
      const action = { type: getOrders.fulfilled.type, payload: mockOrders };
      const state = reducer({ ...initialState, loading: true }, action);

      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
    });

    it('должен сохранять ошибку и ставить loading=false при rejected', () => {
      const action = {
        type: getOrders.rejected.type,
        error: { message: 'Order fetch error' }
      };
      const state = reducer({ ...initialState, loading: true }, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Order fetch error');
    });
  });
});
