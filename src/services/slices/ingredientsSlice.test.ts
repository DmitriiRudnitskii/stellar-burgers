import { ingredientSlice, getIngredients } from './ingredientsSlice';

describe('ingredientsSlice extraReducers', () => {
  const reducer = ingredientSlice.reducer;
  const initialState = {
    buns: [],
    mains: [],
    sauces: [],
    isIngredientsLoading: false,
    error: null
  };

  it('должен менять isIngredientsLoading на true при getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = reducer(initialState, action);

    expect(state.isIngredientsLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен заполнять данные и менять isIngredientsLoading на false при getIngredients.fulfilled', () => {
    const mockPayload = [
      { type: 'bun', name: 'Булка' },
      { type: 'main', name: 'Котлета' },
      { type: 'sauce', name: 'Соус' }
    ];

    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockPayload
    };

    const state = reducer(initialState, action);

    expect(state.isIngredientsLoading).toBe(false);
    expect(state.buns).toHaveLength(1);
    expect(state.mains).toHaveLength(1);
    expect(state.sauces).toHaveLength(1);
  });

  it('должен записывать ошибку при getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Network error' }
    };

    const state = reducer(initialState, action);

    expect(state.isIngredientsLoading).toBe(false);
    expect(state.error).toBe('Network error');
  });
});
