import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seenProducts: [
    { id: 0, seen: 0 },
    { id: 1, seen: 0 },
    { id: 2, seen: 0 },
    { id: 3, seen: 0 },
    { id: 4, seen: 0 },
    { id: 5, seen: 0 },
    { id: 6, seen: 0 },
    { id: 7, seen: 0 },
    { id: 8, seen: 0 },
    { id: 9, seen: 0 },
    { id: 10, seen: 0 },
    { id: 11, seen: 0 },
    { id: 12, seen: 0 },
    { id: 13, seen: 0 },
    { id: 14, seen: 0 },
    { id: 15, seen: 0 },
    { id: 16, seen: 0 },
    { id: 17, seen: 0 },
  ],
};

const seenSlice = createSlice({
  name: "seen",
  initialState,
  reducers: {
    productSeen: (state, action) => {
      const prodId = action.payload;
      state.seenProducts = state.seenProducts.map((pr) => {
        if (pr.id === prodId) {
          return { ...pr, seen: pr.seen + 1 };
        } else {
          return pr;
        }
      });
    },
  },
});

export const { productSeen } = seenSlice.actions;

export default seenSlice.reducer;
