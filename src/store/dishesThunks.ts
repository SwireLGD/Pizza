import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../app/store";
import axiosApi from "../axiosApi";
import { ApiDishes, Dish } from "../types";
import { updateDishes } from "./cartSlice";

export const fetchDishes = createAsyncThunk<Dish[], void, {dispatch: AppDispatch}>(
    'dishes/fetchAll',
    async (_arg, thunkAPI) => {
        const {data: dishes} = await axiosApi.get<ApiDishes | null>('/pizza.json');

        let newDishes: Dish[] = [];
 
        if (dishes) {
            newDishes = Object.keys(dishes).map(key => ({
                id: key,
                ...dishes[key],
            }));
        }

        thunkAPI.dispatch(updateDishes(newDishes));
        return newDishes;
    }
);

export const deleteDish = createAsyncThunk<void, string>(
    'dishes/delete',
    async (dishId) => {
        await axiosApi.delete('/pizza/' + dishId + '.json');
    },
);