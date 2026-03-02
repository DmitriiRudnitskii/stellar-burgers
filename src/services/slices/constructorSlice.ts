import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '../../utils/types';
import { orderBurgerApi } from '@api';

type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};
export const orderBurger = createAsyncThunk(
  'order/',
  async (data: string[]) => await orderBurgerApi(data)
);

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.bun = action.payload as TConstructorIngredient;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.ingredients.push({
        ...action.payload
      });
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter((ingredient) => {
          if (action.payload.id !== ingredient.id) {
            return true;
          } else {
            return false;
          }
        });
    },
    moveUpIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (ingredient) => {
          if (ingredient.id === action.payload.id) {
            return true;
          }
          return false;
        }
      );
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.toSpliced(ingredientIndex, 1);
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.toSpliced(
          ingredientIndex - 1,
          0,
          action.payload
        );
    },
    moveDownIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (ingredient) => {
          if (ingredient.id === action.payload.id) {
            return true;
          }
          return false;
        }
      );
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.toSpliced(ingredientIndex, 1);
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.toSpliced(
          ingredientIndex + 1,
          0,
          action.payload
        );
    },
    closeModal: (state, action: PayloadAction) => {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },

  selectors: {
    getConstructorSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems = { bun: null, ingredients: [] };
      });
  }
});

export const { getConstructorSelector } = constructorSlice.selectors;
export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  closeModal
} = constructorSlice.actions;
export const reducer = constructorSlice.reducer;
