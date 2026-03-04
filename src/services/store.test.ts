import { rootReducer } from './store';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние при вызове с undefined и неизвестным экшеном', () => {
    const action = { type: 'UNKNOWN_ACTION' };

    const initialState = rootReducer(undefined, action);

    expect(initialState).toHaveProperty('ingredients', expect.any(Object));
    expect(initialState).toHaveProperty(
      'burgerConstructor',
      expect.any(Object)
    );
    expect(initialState).toHaveProperty('user', expect.any(Object));
    expect(initialState).toHaveProperty('feed', expect.any(Object));
    expect(initialState).toHaveProperty('order', expect.any(Object));
  });
});
