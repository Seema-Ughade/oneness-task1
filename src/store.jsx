import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import currencyReducer from "./slices/currencySlice"

const store = configureStore({
  reducer: {
    cart: cartReducer,
    currency: currencyReducer,

  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store; // ✅ This fixes the error
