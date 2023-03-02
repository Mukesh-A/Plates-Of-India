import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createfood = createAsyncThunk(
  "post/createFood",
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
export const getFoods = createAsyncThunk(
  "post/getFoods",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getFoods();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getPost = createAsyncThunk(
  "post/getPost",
  async (id, { rejectWithValue }) => {
    // console.log("1", id);
    try {
      const response = await api.getPost(id);
      // console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const foodSlice = createSlice({
  name: "post",
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
      // state.error = action.payload.message;
    },
    [getFoods.pending]: (state, action) => {
      state.loading = true;
    },
    [getFoods.fulfilled]: (state, action) => {
      state.loading = false;
      state.foods = action.payload;
    },
    [getFoods.rejected]: (state, action) => {
      state.loading = false;
      // state.error = action.payload.message;
    },
    [getPost.pending]: (state, action) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.food = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      // state.error = action.payload.message;
    },
  },
});
export default foodSlice.reducer;
// export const { createfood } = foodSlice.actions;
