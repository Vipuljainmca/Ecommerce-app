import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.value = state.value + 1;
      state.items = [...state.items, action.payload];
      state.totalPrice = state.totalPrice + action.payload?.price;
    },
    removeFromCart: (state, action) => {
      state.value = state.value - 1;
      state.items = state.items.filter((item) => item.id != action.payload?.id);
      state.totalPrice = state.totalPrice - action.payload?.price;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
