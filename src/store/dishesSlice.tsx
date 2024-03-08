import { createSlice } from "@reduxjs/toolkit";
import { Dish } from "../types";
import { fetchDishes } from "./dishesThunks";
import {RootState} from '../app/store';


interface DishesState {
    items: Dish[];
}

const initialState: DishesState = {
    items: [],
};

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDishes.fulfilled, (state, {payload: dishes}) => {
                state.items = dishes;
            });
    }
});

export const dishesReducer = dishesSlice.reducer;

export const selectDishes = (state: RootState) => state.dishes.items;