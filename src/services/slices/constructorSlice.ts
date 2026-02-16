import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TConstructorIngredient,TOrder } from '../../utils/types';


type TConstructorState = {
    constructorItems:{
    bun:TConstructorIngredient | null,
    ingredients: TConstructorIngredient[]},
    orderRequest: boolean,
    orderModalData:TOrder| null
}

const initialState : TConstructorState = {
    constructorItems: {
        bun: null,
        ingredients:[]},
    orderRequest:false,
    orderModalData:null         
}

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers:{
            addBun:(state, action: PayloadAction<TConstructorIngredient >) => {
              state.constructorItems.bun = action.payload 
            },
            addIngredient:(state,action:PayloadAction<TConstructorIngredient>) => {
              state.constructorItems.ingredients.push(action.payload)
            },
            removeIngredient:(state,action:PayloadAction<TConstructorIngredient>) => {
              state.constructorItems.ingredients = state.constructorItems.ingredients.filter((ingredient) => {
                if (action.payload._id !== ingredient._id) {
                  return true
                } else {
                  return false
                }

              })
            },
          },
          
      selectors: {
        getConstructorSelector: (state) => state,
    }
        })

export const {getConstructorSelector} = constructorSlice.selectors
export const addBun = constructorSlice.actions.addBun
export const addIngredient = constructorSlice.actions.addIngredient
export const removeIngredient = constructorSlice.actions.removeIngredient
export const reducer = constructorSlice.reducer 
 