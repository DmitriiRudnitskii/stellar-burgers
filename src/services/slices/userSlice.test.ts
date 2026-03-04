import { userSlice, authChecked, loginUser, registerUser, updateUser, getUser, logoutUser } from './userSlice';

describe('userSlice', () => {
  const reducer = userSlice.reducer;
  const initialState = {
    isAuthChecked: false,
    isAuthenticated: false,
    user: null,
    loginUserError: undefined,
    loginUserRequest: false
  };

  const mockUser = { email: 'test@yandex.ru', name: 'Дмитрий' };

  it('должен менять isAuthChecked на true при authChecked', () => {
    const action = authChecked();
    const state = reducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
  });

  describe('Асинхронный экшен loginUser', () => {
    it('должен ставить loginUserRequest=true при pending', () => {
      const action = { type: loginUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.loginUserRequest).toBe(true);
      expect(state.loginUserError).toBeUndefined();
    });

    it('должен авторизовать пользователя при fulfilled', () => {
      const action = { type: loginUser.fulfilled.type, payload: { user: mockUser } };
      const state = reducer({ ...initialState, loginUserRequest: true }, action);
      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockUser);
    });

    it('должен сохранять ошибку при rejected', () => {
      const action = { type: loginUser.rejected.type, error: { message: 'Login Error' } };
      const state = reducer({ ...initialState, loginUserRequest: true }, action);
      expect(state.loginUserRequest).toBe(false);
      expect(state.loginUserError).toBe('Login Error');
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('Асинхронные экшены getUser и updateUser', () => {
    it('должны ставить loginUserRequest=true при pending', () => {
      expect(reducer(initialState, { type: getUser.pending.type }).loginUserRequest).toBe(true);
      expect(reducer(initialState, { type: updateUser.pending.type }).loginUserRequest).toBe(true);
    });

    it('getUser.fulfilled должен сохранять пользователя и статус авторизации', () => {
      const action = { type: getUser.fulfilled.type, payload: { user: mockUser } };
      const state = reducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loginUserRequest).toBe(false);
    });

    it('getUser.rejected должен снимать статус авторизации', () => {
      const authenticatedState = { ...initialState, isAuthenticated: true };
      const action = { type: getUser.rejected.type };
      const state = reducer(authenticatedState, action);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(false);
    });
  });

  describe('Асинхронный экшен logoutUser', () => {
    it('должен ставить loginUserRequest=true при pending', () => {
      const action = { type: logoutUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.loginUserRequest).toBe(true);
    });

    it('должен очищать данные пользователя при fulfilled', () => {
      const authenticatedState = { ...initialState, isAuthenticated: true, user: mockUser };
      const action = { type: logoutUser.fulfilled.type };
      const state = reducer(authenticatedState, action);
      
      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(true);
    });
  });
});
