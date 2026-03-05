import {
  constructorSlice,
  addBun,
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient
} from './constructorSlice';

describe('constructorSlice', () => {
  const reducer = constructorSlice.reducer;

  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null
  };

  const mockIngredient = {
    _id: '60d3b41abdacab0026a733c6',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  };

  const mockConstructorIngredient = {
    ...mockIngredient,
    id: 'test-unique-id-1'
  };

  it('должен обрабатывать addBun', () => {
    const action = addBun(mockIngredient);
    const state = reducer(initialState, action);
    expect(state.constructorItems.bun).toEqual(mockIngredient);
  });

  it('должен обрабатывать addIngredient', () => {
    const action = addIngredient(mockConstructorIngredient);
    const state = reducer(initialState, action);
    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual(
      mockConstructorIngredient
    );
  });

  it('должен обрабатывать removeIngredient', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [mockConstructorIngredient]
      }
    };
    const action = removeIngredient(mockConstructorIngredient);
    const state = reducer(stateWithIngredient, action);
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  it('должен обрабатывать изменение порядка (moveUp и moveDown)', () => {
    const item1 = { ...mockConstructorIngredient, id: '1', name: 'Соус' };
    const item2 = { ...mockConstructorIngredient, id: '2', name: 'Мясо' };

    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [item1, item2]
      }
    };

    let state = reducer(stateWithIngredients, moveDownIngredient(item1));
    expect(state.constructorItems.ingredients[0].id).toBe('2');
    expect(state.constructorItems.ingredients[1].id).toBe('1');

    state = reducer(state, moveUpIngredient(item1));
    expect(state.constructorItems.ingredients[0].id).toBe('1');
    expect(state.constructorItems.ingredients[1].id).toBe('2');
  });
});
