import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userArray: [
    { id: 0, seen: 0, buy: 0 },

    // { id: 1, seen: 0, buy: 0 },
    // { id: 2, seen: 0, buy: 0 },
    // { id: 3, seen: 0, buy: 0 },
    // { id: 4, seen: 0, buy: 0 },
    // { id: 5, seen: 0, buy: 0 },
    // { id: 6, seen: 0, buy: 0 },
    // { id: 7, seen: 0, buy: 0 },
    // { id: 8, seen: 0, buy: 0 },
    // { id: 9, seen: 0, buy: 0 },
    // { id: 10, seen: 0, buy: 0 },
    // { id: 11, seen: 0, buy: 0 },
    // { id: 12, seen: 0, buy: 0 },
    // { id: 13, seen: 0, buy: 0 },
    // { id: 14, seen: 0, buy: 0 },
    // { id: 15, seen: 0, buy: 0 },
    // { id: 16, seen: 0, buy: 0 },
    // { id: 17, seen: 0, buy: 0 },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCartData: (state) => {
      state.userArray = state.userArray.map((pro) => {
        return { ...pro, seen: 0, buy: 0 };
      });
      //LocalStorage
      // localStorage.setItem("userData", JSON.stringify(state.userArray));

      localStorage.setItem("userData", JSON.stringify(initialState.userArray));
      // console.log(localStorage);
      // console.log(state.userArray);
    },
    addToCart: (state, action) => {
      const pId = action.payload;
      const idArray = state.userArray.map((i) => {
        return i.id;
      });

      idArray.includes(pId)
        ? (state.userArray = state.userArray.map((pro) => {
            if (pro.id === pId) {
              return { ...pro, buy: pro.buy + 1 };
            } else {
              return { ...pro };
            }
          }))
        : state.userArray.push({ id: pId, buy: 1 });
      //LocalStorage function______________________________
      localStorage.setItem("userData", JSON.stringify(state.userArray));
    },
    reduceCart: (state, action) => {
      const pId = action.payload;
      state.userArray = state.userArray.map((pro) => {
        if (pro.id === pId) {
          return { ...pro, buy: pro.buy - 1 };
        } else {
          return { ...pro };
        }
      });
      //LocalStorage function______________________________
      localStorage.setItem("userData", JSON.stringify(state.userArray));
    },
    productSeen: (state, action) => {
      const prodId = action.payload;
      const idArray = state.userArray.map((i) => {
        return i.id;
      });

      idArray.includes(prodId)
        ? (state.userArray = state.userArray.map((pr) => {
            if (pr.id === prodId) {
              return { ...pr, seen: pr.seen + 1 };
            } else {
              return { ...pr };
            }
          }))
        : state.userArray.push({ id: prodId, seen: 1, buy: 0 });
      //LocalStorage function______________________________
      localStorage.setItem("userData", JSON.stringify(state.userArray));
    },
    bootstrapUser: (state) => {
      // localStorage.setItem("userData", JSON.stringify(state.userArray));
      const firstArray = state.userArray;
      !localStorage.userData
        ? (state.userArray = firstArray)
        : (state.userArray = JSON.parse(localStorage.getItem("userData")));
      console.log(firstArray);
    },
  },
});

export const {
  productSeen,
  addToCart,
  reduceCart,
  resetCartData,
  bootstrapUser,
} = userSlice.actions;

export default userSlice.reducer;
