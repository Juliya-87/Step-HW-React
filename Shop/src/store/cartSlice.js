import { createSlice, createListenerMiddleware } from "@reduxjs/toolkit";

const getInitialCart = () => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: getInitialCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existing = state.items.find(i => i.id === id);
      if (existing) {
        existing.quantity += quantity || 1;
      } else {
        state.items.push({ id, quantity: quantity || 1 });
      }
    },
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

const cartListenerMiddleware = createListenerMiddleware();

cartListenerMiddleware.startListening({
  predicate: action => action.type.startsWith("cart/"),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    try {
      localStorage.setItem("cart", JSON.stringify(state.cart.items));
    } catch {
      // Ignore write errors
    }
  },
});

export const { addToCart, changeQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export const cart = {
  reducer: cartSlice.reducer,
  middleware: cartListenerMiddleware.middleware,
  actions: cartSlice.actions,
};

export default cartSlice.reducer;
