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
export const getPostByUser = createAsyncThunk(
  "post/getPostByUser",
  async (userId, { rejectWithValue }) => {
    console.log(userId);
    try {
      const response = await api.getPostByUser(userId);
      // console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deletePost(id);
      toast.success("Post deleted Successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, updatedPostData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updatePost(updatedPostData, id);
      toast.success("Post updated Successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const searchPosts = createAsyncThunk(
  "post/searchPosts",
  async (search, { rejectWithValue }) => {
    try {
      const response = await api.getPostBySearch(search);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const searchTags = createAsyncThunk(
  "post/searchTags",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getPostByTag(tag);

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
    tagPosts: [],
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
    [getPostByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getPostByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userFoods = action.payload;
    },
    [getPostByUser.rejected]: (state, action) => {
      state.loading = false;
      // state.error = action.payload.message;
    },
    [deletePost.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userFoods = state.userFoods.filter((item) => item._id !== id);
        state.foods = state.foods.filter((item) => item._id !== id);
      }
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      // state.error = action.payload.message;
    },
    [updatePost.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userFoods = state.userFoods.map((item) =>
          item._id === id ? action.payload : item
        );
        state.foods = state.foods.filter((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      // state.error = action.payload.message;
    },
    [searchPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [searchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.foods = action.payload;
    },
    [searchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [searchTags.pending]: (state, action) => {
      state.loading = true;
    },
    [searchTags.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagPosts = action.payload;
    },
    [searchTags.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
export default foodSlice.reducer;
// export const { createfood } = foodSlice.actions;
