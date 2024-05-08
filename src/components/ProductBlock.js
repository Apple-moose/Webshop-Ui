import "../App.css";
// import "./Styles.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../store/products/selectors";
import { fetchProducts } from "../store/products/actions";

export default function ProductBlock() {
  const dispatch = useDispatch();
  const product = useSelector(selectProducts);
  const categories = [
    { id: 2, name: "clothing" },
    { id: 3, name: "plants" },
    { id: 4, name: "books" },
    { id: 7, name: "board game" },
    { id: 8, name: "sport game" },
  ];
  //   const pizzas = useSelector(selectPizza);
  // dispatch(fetchProducts);
  useEffect(() => {
    dispatch(fetchProducts);
  }, [dispatch]);

  return product.map((pro) => {
    return (
      <>
        <div className="productDisplay">
          <button>
            <img className="product" src={pro.imageUrl} alt="not found!"></img>
          </button>
          <p>
            <b>{pro.name}</b> <span className="right">tags: {categories.map((cat) => {
              if (cat.id === pro.categoryId) return cat.name;
            })}</span>
          </p>
          <p>€{pro.price} <span className="right">add to cart</span></p>
        </div>
        {/* <button
            onClick={() => dispatch(toggleFavorite(pizza.id))}
            className={`fav-toggle ${
              user.favorites.includes(pizza.id) ? "fav" : ""
            }`}
          >
            {" "}
            {user.favorites.includes(pizza.id) ? "♥️" : "♡"}
          </button>{" "} */}
        {/* <div className="overlay">
            <span>{p.description}</span>
            <span>
              <strong>was bought:</strong> {pizza.bought} times
            </span>
          </div> */}
      </>
    );
  });
}
