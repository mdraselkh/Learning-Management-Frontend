import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import courseAccessReducer from "./courseAccessSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add your cart slice here
    auth: authReducer,
    courseAccess: courseAccessReducer,
  },
});

export default store;
