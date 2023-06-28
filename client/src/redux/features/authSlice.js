import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
// in async function we can pass only one argument it doesn't accept more than one
// here we have more than one argu so we are passing in the form of object

export const login = createAsyncThunk(
  "/users/signIn",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      // console.log(response);
      toast.success("Login successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const register = createAsyncThunk(
  "/users/signUp",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Register successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },

  /// when u store data in redux then on refresh entire data get wiped so to make it PERSISTENT u have to use the reducers and import in the global file that is App.js then from their we have stored the user data in the local storage. get that data and dispatch it to this reducer
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // console.log("from db", action.payload);
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
      // console.log("from db", action.payload);
    },
  },
  extraReducers: {
    // login promise
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      // localStorage.setItem("sample", JSON.stringify(jj));
      state.user = action.payload;
      console.log("mu", state.user);
      // console.log("mu", state.user);
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    //Register promise
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
export default authSlice.reducer;
export const { setUser, setLogout } = authSlice.actions;
