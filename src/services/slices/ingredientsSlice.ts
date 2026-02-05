import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '@api';

type TIngredientsState = {
  buns: Array<TIngredient>,
  mains: Array<TIngredient>,
  sauces: Array<TIngredient>
  loading: boolean,
  error: string | null
}
export const getIngredients = createAsyncThunk(
   "/ingredients",
   async () => {
    return getIngredientsApi();
   },
); 

const initialState: TIngredientsState = {
  buns:[],
  mains: [],
  sauces: [],
  loading: false,
  error: null
} 

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredients:(state, action: PayloadAction<TIngredient[]>) => {
      state.buns = action.payload.filter(ingredient => ingredient.type === 'bun')
      state.mains = action.payload.filter(ingredient => ingredient.type === 'main')
      state.sauces = action.payload.filter(ingredient => ingredient.type === 'sauce')
    }
  },
  selectors: {
        getIngredientsSelector: (state) => state,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string | null;
            })
            .addCase(getIngredients.fulfilled, (state, action) => {
                state.loading = false;
                state.buns = action.payload.filter(ingredient => ingredient.type === 'bun')
                state.mains = action.payload.filter(ingredient => ingredient.type === 'main')
                state.sauces = action.payload.filter(ingredient => ingredient.type === 'sauce')
            })
    }

})

export const {addIngredients} = ingredientSlice.actions;
export const reducer = ingredientSlice.reducer;
export const {getIngredientsSelector} = ingredientSlice.selectors
