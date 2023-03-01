import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createfood = createAsyncThunk(
  "food/createFood",
  async ({ updatedFoodData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createFood(updatedFoodData);
      toast.success("Post Add successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const foodSlice = createSlice({
  name: "food",
  initialState: {
    food: {},
    foods: [],
    userFoods: [],
    error: "",
    loading: false,
  },

  extraReducers: {
    // login promise
    [createfood.pending]: (state, action) => {
      state.loading = true;
    },
    [createfood.fulfilled]: (state, action) => {
      state.loading = false;
      state.foods = [action.payload];
    },
    [createfood.rejected]: (state, action) => {
      state.loading = false;
    //   state.error = action.payload.message;
    },
  },
});
export default foodSlice.reducer;
// export const { createfood } = foodSlice.actions;
