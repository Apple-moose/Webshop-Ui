import { createSelector } from "reselect";

// Base selector
const selectProductState = (reduxState) => reduxState.products.products;

// Simple selector without sorting (no need for memoization as it directly accesses state)
export const selectProducts = selectProductState;

// Memoized version of selectProductsByNames
export const selectProductsByNames = createSelector(
  [selectProductState],
  (products) => {
    const alphaArray = [...products];
    return alphaArray.sort((a, b) => a.name.localeCompare(b.name));
  }
);
//Old version...
// export const selectProductsByNames = (reduxState) => {
//   const alphaArray = [...reduxState.products.products];
//   return alphaArray.sort((a, b) => a.name.localeCompare(b.name));
// };

export const selectProductsByTags = createSelector(
  [selectProductState],
  (products) => {
    const alphaArray = [...products];
    return alphaArray.sort((a, b) => {
      if (parseInt(b.categoryId) > parseInt(a.categoryId)) return 1;
      else if (parseInt(b.categoryId) < parseInt(a.categoryId)) return -1;
      else return 0;
    });
  }
);
//Old version...
// export const selectProductsByTags = (reduxState) => {
//   const alphaArray = [...reduxState.products.products];
//   return alphaArray.sort((a, b) => {
//     if (parseInt(b.categoryId) > parseInt(a.categoryId)) return 1;
//     else if (parseInt(b.categoryId) < parseInt(a.categoryId)) return -1;
//     else return 0;
//   });
// };

export const selectProductsByPrices = createSelector(
  [selectProductState],
  (products) => {
    const alphaArray = [...products];
    return alphaArray.sort((a, b) => {
      if (parseInt(b.price) > parseInt(a.price)) return 1;
      else if (parseInt(b.price) < parseInt(a.price)) return -1;
      else return 0;
    });
  }
);
//Old version....
// export const selectProductsByPrices = (reduxState) => {
//   const alphaArray = [...reduxState.products.products];
//   return alphaArray.sort((a, b) => {
//     if (parseInt(b.price) > parseInt(a.price)) return 1;
//     else if (parseInt(b.price) < parseInt(a.price)) return -1;
//     else return 0;
//   });
// };

export const selectFilteredProducts = (tagId) =>
  createSelector([selectProductState], (products) => {
    return products.filter((pr) => pr.categoryId === parseInt(tagId));
  });
//   Old version...
// export const selectFilteredProducts = (tagId) => (reduxState) => {
//   const filteredArray = [...reduxState.products.products];
//   return filteredArray.filter((pr) => pr.categoryId === parseInt(tagId));
// };
