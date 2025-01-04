import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderAddress(state, action) {
      state.order.push(action.payload);
    },
  },
});

export const { addOrderAddress } = orderSlice.actions;

export default orderSlice.reducer;

export const getOrderAddress = (state) => state.order.order;
