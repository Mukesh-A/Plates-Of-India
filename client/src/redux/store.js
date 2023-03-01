import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import foodReducer from "./features/foodSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    food: foodReducer,
  },
});
