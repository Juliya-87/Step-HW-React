import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cart } from "./cartSlice.js";
import { api } from "./apiSlice.js";

export const store = configureStore({
  reducer: {
    cart: cart.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware).prepend(cart.middleware),
});

setupListeners(store.dispatch);
