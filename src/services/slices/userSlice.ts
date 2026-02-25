import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUserApi,
  TLoginData,
  TRegisterData,
  registerUserApi,
  updateUserApi,
  getUserApi,
  logoutApi
} from '@api';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  loginUserError: string | undefined;
  loginUserRequest: boolean;
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (!data?.success) {
      return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, email, password }: TRegisterData) => {
    const data = await registerUserApi({ name, email, password });
    if (!data?.success) {
      return data;
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ name, email, password }: Partial<TRegisterData>) =>
    await updateUserApi({ name, email, password })
);
export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const data = await logoutApi();

  if (data?.success) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: undefined,
  loginUserRequest: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getUserSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = undefined;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserRequest = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserRequest = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthenticated = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loginUserRequest = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.loginUserRequest = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      });
  }
});

export const { getUserSelector } = userSlice.selectors;
export const { authChecked } = userSlice.actions;
