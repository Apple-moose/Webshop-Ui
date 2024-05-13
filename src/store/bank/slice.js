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
      //LocalStorage function______________________________
      localStorage.setItem("userBank", JSON.stringify(state.amount));
    },
    reduceAmount: (state, action) => {
      state.amount = state.amount - action.payload;
      //LocalStorage function______________________________
      localStorage.setItem("userBank", JSON.stringify(state.amount));
    },
    reset: (state) => {
      state.amount = initialState.amount;
      //LocalStorage function______________________________
      localStorage.setItem("userBank", JSON.stringify(state.amount));
    },
    bootstrapBank: (state) => {
      state.amount = JSON.parse(localStorage.getItem("userBank"));
    },
  },
});

export const { addAmount, reduceAmount, reset, bootstrapBank } =
  bankSlice.actions;

export default bankSlice.reducer;
