import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartDish, Dish } from "../types";
import {RootState} from '../app/store';

interface cartState {
    cartDishes: CartDish[];
}

const initialState: cartState = {
    cartDishes: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addDish: (state, {payload: dish}: PayloadAction<Dish>) => {
            const index = state.cartDishes.findIndex(cartDish => cartDish.dish.id === dish.id);
    
            if (index !== -1) {
                state.cartDishes[index].amount++;
            } else {
                state.cartDishes.push({
                    dish,
                    amount: 1,
                });
            }
        },
        clearCart: (state) => {
            state.cartDishes = [];
        },
        updateDishes: (state, {payload: dishes}: PayloadAction<Dish[]>) => {
            const newCartDishes: CartDish[] = [];
    
            state.cartDishes.forEach(cartDish => {
            const existingDish = dishes.find(dish => cartDish.dish.id === dish.id);
    
            if (!existingDish) {
                return;
            }
    
            newCartDishes.push({
                amount: cartDish.amount,
                dish: existingDish,
            });
            });
  
        state.cartDishes = newCartDishes;
        },
    },
});

export const cartReducer = cartSlice.reducer;

export const {addDish, clearCart, updateDishes} = cartSlice.actions;

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;