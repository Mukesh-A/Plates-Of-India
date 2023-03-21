import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createfood = createAsyncThunk(
  "post/createFood",
  async ({ updatedPostData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createFood(updatedPostData);
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
  async (page, { rejectWithValue }) => {
    try {
      // console.log(page);
      const response = await api.getFoods(page);
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
export const getRelatedPosts = createAsyncThunk(
  "post/getRelatedPosts",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedPosts(tags);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const likePost = createAsyncThunk(
  "post/likePost",
  async ({ _id }, { rejectWithValue }) => {
    // console.log("1", id);
    try {
      const response = await api.likePost(_id);
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
    tagPosts: [],
    relatedPosts: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
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
      state.foods = action.payload.data;
      // console.log(action.payload);
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
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
    [getRelatedPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelatedPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedPosts = action.payload;
    },
    [getRelatedPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [likePost.pending]: (state, action) => {},
    [likePost.fulfilled]: (state, action) => {
      state.loading = false;
      // console.log("action", action);
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.foods = state.foods.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    },
    [likePost.rejected]: (state, action) => {
      // state.loading = false;
      // state.error = action.payload.message;
    },
  },
});
export const { setCurrentPage } = foodSlice.actions;
export default foodSlice.reducer;
// export const { createfood } = foodSlice.actions;
