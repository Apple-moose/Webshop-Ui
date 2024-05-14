export const selectProducts = (reduxState) => reduxState.products.products;

export const selectProductsByNames = (reduxState) => {
  const alphaArray = [...reduxState.products.products];
  return alphaArray.sort((a, b) => a.name.localeCompare(b.name));
};

export const selectProductsByTags = (reduxState) => {
  const alphaArray = [...reduxState.products.products];
  return alphaArray.sort((a, b) => {
    if (parseInt(b.categoryId) > parseInt(a.categoryId)) return 1;
    else if (b.categoryId < parseInt(a.categoryId)) return -1;
    else return 0;
  });
};

export const selectProductsByPrices = (reduxState) => {
  const alphaArray = [...reduxState.products.products];
  return alphaArray.sort((a, b) => {
    if (parseInt(b.price) > parseInt(a.price)) return 1;
    else if (b.price < parseInt(a.price)) return -1;
    else return 0;
  });
};

export const selectFilteredProducts = (tagId) => (reduxState) => {
  const filteredArray = [...reduxState.products.products];
  return filteredArray.filter((pr) => pr.categoryId === parseInt(tagId));
};
