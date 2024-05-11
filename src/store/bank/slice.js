import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
};

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    addAmount: (state, action) => {
      state.amount = state.amount + action.payload;
      console.log("amount added:",action.payload);
    },
    reduceAmount: (state, action) => {
      state.amount = state.amount - action.payload;
      console.log("amount reduced:",action.payload);

    },
    reset: (state) => {
      console.log("reset!");
      state.amount = initialState.amount;
    },
  },
});

export const { addAmount, reduceAmount, reset } = bankSlice.actions;

export default bankSlice.reducer;
